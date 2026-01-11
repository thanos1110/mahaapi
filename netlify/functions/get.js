import { getStore } from "@netlify/blobs";

export async function handler() {
  const store = getStore("licenses");

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
