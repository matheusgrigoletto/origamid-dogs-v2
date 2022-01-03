const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "~assets": path.resolve(__dirname, "src/assets"),
      "~components": path.resolve(__dirname, "src/components"),
      "~containers": path.resolve(__dirname, "src/containers"),
      "~hooks": path.resolve(__dirname, "src/hooks"),
      "~pages": path.resolve(__dirname, "src/pages"),
      "~": path.resolve(__dirname, "src"),
    },
  };
  return config;
};
