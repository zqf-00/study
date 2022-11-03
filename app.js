/*
 * @Author: zqf 1826915214@qq.com
 * @Date: 2022-11-02 18:14:23
 * @LastEditors: zqf 1826915214@qq.com
 * @LastEditTime: 2022-11-03 11:15:09
 * @FilePath: \test\express-login-registry-service\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 express 模块
const express = require("express");

// 创建 express 服务器实例
const app = express();
const bodyParser = require("body-parser");

// 导入 cors 中间件，解决跨域问题
const cors = require("cors");
// 将 cors 注册为全局中间件
app.use(cors());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 导入 express-jwt 并解构
const { expressjwt: jwt } = require("express-jwt");

// 密钥
const { secretKey } = require("./config");
// 使用 express-jwt 这个中间件，排除注册和登录
app.use(
  jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/user/],
  })
);

// 导入路由模块
const userRouter = require("./router/user");
const joi = require("joi");
// 在node.js中传递body参数必须用body - parser进行解析; 放在路由之前
app.use(bodyParser.json());
// 注册路由模块
app.use("/user", userRouter);

// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError)
    console.log(err);
    return res.send({
      status: 400,
      msg: "请求参数不合法" + err.message,
    });
  // 身份认证失败错误
  if (err.name === "UnauthorziedError")
    return res.send({ status: 401, msg: "无效的token！" });
  // 其它错误
  res.send({
    status: 500,
    msg: err.message,
  });
});

// 调用 app.listen 方法，指定端口号启动 web 服务器
app.listen(18060, () => {
  console.log("api server running at http://127.0.0.1:18060");
});
