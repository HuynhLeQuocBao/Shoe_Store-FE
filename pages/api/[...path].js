import httpProxy from "http-proxy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer({});

export default function handler(req, res) {
  return new Promise((resolve) => {
    // don't send cookie to API server
    req.headers.cookie = "";

    // api/students ==> https:xxxxxxx/students

    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
