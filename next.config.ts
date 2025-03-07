const path = require("path");

module.exports = {
  images: {
    domains: [
      "www.w3schools.com",
      "encrypted-tbn0.gstatic.com",
      "images.ctfassets.net",
    ],
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "./");
    return config;
  },
};
