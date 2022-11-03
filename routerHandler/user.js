/*
 * @Author: zqf 1826915214@qq.com
 * @Date: 2022-11-02 18:14:23
 * @LastEditors: zqf 1826915214@qq.com
 * @LastEditTime: 2022-11-03 11:05:57
 * @FilePath: \test\express-login-registry-service\routerHandler\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 jwt 生成 token 包
const jwt = require("jsonwebtoken");

// 密钥和token生效时间
const { secretKey, expiresIn } = require("../config");

// 导入数据库操作模块
const db = require("../db");

// 导入 bcryptjs
const bcrypt = require("bcryptjs");

// 注册用户的处理函数
exports.register = (req, res) => {
  // 获取客户端请求的用户信息
  const userInfo = req.body;
  // 定义 SQL 语句，查询用户名是否被占用
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.send({ status: 500, msg: err.message });
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.send({ status: 400, msg: "用户名被占用，请更换其他用户名！" });
    }
    // 调用 bcrypt.hashSync() 对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // 定义插入新用户的 SQL 语句
    const sql = "INSERT INTO users SET ?";
    db.query(sql, userInfo, (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.send({ status: 500, msg: err.message });
      // 判断影响行数是否为 1
      if (results.affectedRows !== 1)
        return res.send({ status: 500, msg: "注册用户失败，请联系管理员！" });
      res.send({ status: 200, msg: "用户注册成功！" });
    });
  });
};

// 登录的处理函数
exports.login = (req, res) => {
  // 接收客户端传递的表单数据
  const userInfo = req.body;
  // 定义 SQL 查询语句
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) res.send({ status: 500, msg: err.message });
    // 执行 SQL 语句成功，但查询条数不等于1
    if (results.length !== 1)
      return res.send({ status: 403, msg: "登陆失败，请检查用户名和密码！" });
    // 判断密码是否正确
    const flag = bcrypt.compareSync(userInfo.password, results[0].password);
    if (!flag) return res.send({ status: 403, msg: "登录失败，密码错误！" });
    // 对用户信息进行加密，生成Token字符串
    const token = jwt.sign({ username: req.body.username }, secretKey, {
      expiresIn: expiresIn,
    });
    res.send({
      status: 200,
      msg: "登陆成功！",
      token: "Bearer " + token,
    });
  });
};
