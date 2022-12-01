const base = "https://translate.googleapis.com/translate_a/single";
const HttpsProxyAgent = require('https-proxy-agent');
const proxyAgent = new HttpsProxyAgent(process.env.http_proxy);

export default {
  fetch: ({ key, from, to, text }) => [
    `${base}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(text)}`,
    {agent: proxyAgent}
  ],
  parse: res =>
    res.json().then(body => {
      body = body && body[0] && body[0][0] && body[0].map(s => s[0]).join("");
      if (!body) throw new Error("Translation not found");
      return body;
    })
};
