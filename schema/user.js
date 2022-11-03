/*
 * @Author: zqf 1826915214@qq.com
 * @Date: 2022-11-02 18:14:23
 * @LastEditors: zqf 1826915214@qq.com
 * @LastEditTime: 2022-11-03 10:49:03
 * @FilePath: \test\express-login-registry-service\schema\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入定义验证规则的包
const joi = require("joi");

// 定义用户名和密码的验证规则
const username = joi.string().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// 验证规则对象 - 注册和登录
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
