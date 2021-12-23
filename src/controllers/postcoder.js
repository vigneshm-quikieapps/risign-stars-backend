const https = require("https");

module.exports.getAddressList = async (req, res, next) => {
  try {
    const { countryCode, postcode } = req.body;
    const path = `/pcw/${
      process.env.POSTCODER_API_KEY
    }/address/${countryCode}/${encodeURIComponent(
      postcode
    )}?format=json&lines=2&addtags=latitude,longitude`;
    const options = {
      // host to forward to
      host: "ws.postcoder.com",
      // port to forward to
      port: 443,
      // path to forward to
      path: path,
      // request method
      method: "GET",
    };
    const copiedRequest = https
      .request(options, (proxiedResponse) => {
        proxiedResponse.setEncoding("utf8");
        // set http status code based on proxied response
        res.writeHead(proxiedResponse.statusCode);
        // wait for data
        proxiedResponse.on("data", (chunk) => {
          res.write(chunk);
        });
        proxiedResponse.on("close", () => {
          // closed, let's end client request as well
          res.end();
        });
        proxiedResponse.on("end", () => {
          // finished, let's finish client request as well
          res.end();
        });
      })
      .on("error", (error) => {
        // we got an error
        throw error;
      });

    copiedRequest.end();
  } catch (error) {
    next(error);
  }
};
