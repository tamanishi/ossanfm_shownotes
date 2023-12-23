/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
}

import { XMLParser } from "fast-xml-parser";
import { Kysely, Generated } from 'kysely';
import { D1Dialect } from 'kysely-d1';

export interface Env {
  DB: D1Database;
}

interface EpisodesTable {
  id: Generated<number>,
  title: string,
  link: string,
  pubDate: string,
  createdAt: Generated<number>,
}

interface ShownotesTable {
  id: Generated<number>,
  episodeId: number,
  title: string,
  link: string,
  createdAt: Generated<number>,
}

interface Database {
  episodes: EpisodesTable,
  shownotes: ShownotesTable,
}

const alwaysArray = ['ul', 'ul.li'];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const response = await (await fetch('https://ossan.fm/feed.xml')).text();
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '__',
      textNodeName: '$text',
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        return alwaysArray.indexOf(jpath) !== -1 ? true : false
      }
    }

    const parser = new XMLParser(options);
    const feedObj = parser.parse(response);

    const db = new Kysely<Database>({ dialect: new D1Dialect({ database: env.DB }) });

    for (const elm of feedObj.rss.channel.item) {
      const descObj = parser.parse(elm.description);

      const pubDate = new Date(elm.pubDate);

      const selectResult = await db
        .selectFrom('episodes')
        .select(({ fn, val, ref }) => [
          fn.count<string>('episodes.title').as('title_count')
        ])
        .where('link', '=', elm.link)
        .where('pubDate', '=', pubDate.toISOString())
        .executeTakeFirstOrThrow();

      if (parseInt(selectResult.title_count) > 0) {
        continue;
      }

      const insertResult = await db
        .insertInto('episodes')
        .values({
          title: elm.title,
          link: elm.link,
          pubDate: pubDate.toISOString(),
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();

      for (const ulElm of descObj.ul) {
        for (const liElm of ulElm.li) {
          if (liElm.a) {
            if (liElm.a.$text === undefined) {
              console.log("========================== TODO: これを捨ててる " + elm.title + " " + JSON.stringify(liElm));
              continue;
            }
            await db
              .insertInto('shownotes')
              .values({
                episodeId: insertResult.id,
                title: liElm.a.$text,
                link: liElm.a.__href,
              })
              .executeTakeFirstOrThrow();
          } else {
            if (typeof (liElm) === 'object') {
              console.log("========================== TODO: これを捨ててる " + elm.title + " " + JSON.stringify(liElm));
              continue;
            }
          }
        }
      }
    }
    return new Response("OK");
  },
};

// ========================== TODO: これを捨ててる 244. やっていて楽しいことをやっていく（ゲスト:セコンさん） {"ul":{"li":{"a":{"$text":"サイナス・リンス キット60包 - 鼻洗浄ならニールメッド","__href":"https://www.neilmed.jp/product/sinusrinse_k_60/"}}}}
// ========================== TODO: これを捨ててる 233. 時間の使い方 {"table":{"tbody":{"tr":{"td":["[#15 締め切り駆動で本を読んでいる話 - ゆるテク","Podcast on Spotify](https://open.spotify.com/episode/0ZFheltV1B5r2PNZVDeZw8)"]}}}}
// ========================== TODO: これを捨ててる 64. 書類が苦手 {"a":[{"$text":"こちら","__href":"https://twitter.com/ossanfm/status/1208676989478957056"},{"$text":"こちら","__href":"https://www.youtube.com/watch?v=2o3GLKynRcU"}],"$text":"17:43 「年末特別公開録音&年初ゲスト回の案内」:でも告知しましたが、2019/12/27 20:00〜公開録音します。会場は。"}
// ========================== TODO: これを捨ててる 50. 部屋とパソコン通信と私 {"a":[{"$text":"Twitterの#ossanfm","__href":"https://twitter.com/search?q=%23ossanfm&src=typed_query&f=live"},{"$text":"おたよりフォーム","__href":"https://forms.gle/LU6iX1XoprZPpLFx7"}],"$text":"01:00:28 「リスナーからのおたより」:への投稿や📮からの 投稿をご紹介。"}
// ========================== TODO: これを捨ててる 49. ここにあったはずなのに... {"a":[{"$text":"Twitterの#ossanfm","__href":"https://twitter.com/search?q=%23ossanfm&src=typed_query&f=live"},{"$text":"おたよりフォーム","__href":"https://forms.gle/LU6iX1XoprZPpLFx7"}],"$text":"00:00 「オープニングトーク」:への投稿や📮からの投稿 をご紹介。話題のNetflixについての感想など。"}
// ========================== TODO: これを捨ててる 15. 最後にして最初の... {"a":[{"$text":"最後にして最初のアイドル - Amazon","__href":"https://www.amazon.co.jp/dp/B0798S7N12/"},{"$text":"短編版","__href":"https://www.amazon.co.jp/dp/B01NCA4FBB"}],"$text":"/"}
// ========================== TODO: これを捨ててる 11. マイクが来たりて泡を飲む {"a":[{"$text":"Ultravoice XM8500","__href":"https://www.soundhouse.co.jp/products/detail/item/19370/"},{"$text":"UMC202HD","__href":"https://www.soundhouse.co.jp/products/detail/item/212161/"}],"ul":{"li":{"a":[{"$text":"PreSonus Studio One Prime","__href":"https://www.mi7.co.jp/products/presonus/studioone/prime/"},{"$text":"Auphonic","__href":"https://auphonic.com/"}],"$text":"録音はでして、あとはに全てを委ねています。"}},"$text":"マイクをx2本に、オーディオI/Fをにしました。"}
// ========================== TODO: これを捨ててる 7. ポセイドン・石川を応援しよう {"ul":{"li":[{"a":{"$text":"カフェイン - Wikipedia","__href":"https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%95%E3%82%A7%E3%82%A4%E3%83%B3"}},{"a":{"$text":"カフェイン中毒 - Wikipedia","__href":"https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%95%E3%82%A7%E3%82%A4%E3%83%B3%E4%B8%AD%E6%AF%92"}},{"a":{"$text":"カフェイン依存症　前編","__href":"http://mimorimisa.com/%E5%AE%9F%E4%BD%93%E9%A8%93/20181020/763/"}}]},"$text":"禁カフェイン"}
// ========================== TODO: これを捨ててる 5. 禁カフェインをお試し中 {"ul":{"li":[{"a":{"$text":"カフェイン - Wikipedia","__href":"https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%95%E3%82%A7%E3%82%A4%E3%83%B3"}},{"a":{"$text":"カフェイン中毒 - Wikipedia","__href":"https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%95%E3%82%A7%E3%82%A4%E3%83%B3%E4%B8%AD%E6%AF%92"}},{"a":{"$text":"カフェイン依存症　前編","__href":"http://mimorimisa.com/%E5%AE%9F%E4%BD%93%E9%A8%93/20181020/763/"}}]},"$text":"禁カフェイン"}
