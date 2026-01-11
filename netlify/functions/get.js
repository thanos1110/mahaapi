import { getStore } from "@netlify/blobs";

export async function handler() {
//  const store = getStore("licenses");
const store = getStore("licenses", {
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN
});

  const { blobs } = await store.list();
  const result = [];

  for (const item of blobs) {
    const val = await store.get(item.key);
    if (val) result.push(JSON.parse(val));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}
