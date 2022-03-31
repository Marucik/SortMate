module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5010",
        changeOrigin: true
      }
    },
    https: false
  },

  transpileDependencies: ["vuetify"]
};
