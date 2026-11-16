export default async (request) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("target");
  if (!targetUrl) {
    return new Response("缺少 target 参数", { status: 400 });
  }

  const reqHeaders = new Headers(request.headers);
  const newReq = new Request(targetUrl, {
    method: request.method,
    headers: reqHeaders,
    body: request.body,
  });

  const res = await fetch(newReq);
  const resHeaders = new Headers(res.headers);
  resHeaders.set("Access-Control-Allow-Origin", "*");
  resHeaders.set("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  resHeaders.set("Access-Control-Allow-Headers", "*");

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: resHeaders });
  }
  return new Response(res.body, { status: res.status, headers: resHeaders });
};
