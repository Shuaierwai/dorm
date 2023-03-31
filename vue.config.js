const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: "localhost",
  //   port: 8080, //设置默认启动端口号
  //   open: true, //自动打开浏览器
  // },
});
//配置单个代理服务器
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8880", //http://172.16.110.74:3001
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          "^/api": "",
          //把路径中的 /api开头 替换成 ''
        },
      },
      "/foo": {
        target: "http://localhost:8881",
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          "^/foo": "",
          //把路径中的 /api开头 替换成 ''
        },
      },
    },
   
  },
};
