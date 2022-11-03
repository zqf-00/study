/*
 * @Author: zqf 1826915214@qq.com
 * @Date: 2022-11-02 18:14:23
 * @LastEditors: zqf 1826915214@qq.com
 * @LastEditTime: 2022-11-03 10:28:23
 * @FilePath: \test\express-login-registry-service\db\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 mysql 模块
const mysql = require("mysql");

// 创建数据库连接对象
const db = mysql.createPool({
  // host: "172.25.43.54",
  host: "47.93.48.91",
  user: "zqf",
  password: "Hjk20220701",
  database: "study",
});

// 向外共享 db 数据库连接对象
module.exports = db;
