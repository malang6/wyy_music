const path = require("path");
// 改了配置，一定要重启才能生效
module.exports={
    configureWebpack:{
        resolve:{
            //配置路径别名(可以简写路径)
            alias:{
                "@views": path.resolve(__dirname, "src/views"),
                "@assets":path.resolve(__dirname,"src/assets"),
                "@comps":path.resolve(__dirname,"src/components"),
                "@store":path.resolve(__dirname,"src/store"),
                "@utils":path.resolve(__dirname,"src/utils"),
                "@api":path.resolve(__dirname,"src/api")
            }
        }
    },
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}
