const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/assets/fonts/_iranyekan.scss"),
        path.resolve(__dirname, "src/styles/_variables.scss"),
      ],
    },
  },
};
