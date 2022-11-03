/*
 * @Author: zqf 1826915214@qq.com
 * @Date: 2022-11-02 18:14:23
 * @LastEditors: zqf 1826915214@qq.com
 * @LastEditTime: 2022-11-03 10:56:34
 * @FilePath: \test\express-login-registry-service\router\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 express 模块
const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require("../routerHandler/user");

// 导入验证规则对象
const { reg_login_schema } = require("../schema/user");

// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");

// 注册新用户
router.post("/register", expressJoi(reg_login_schema), userHandler.register);

// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

// 将路由对象共享出去
module.exports = router;
