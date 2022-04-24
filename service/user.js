const conn = require('../app/database')

class UserService {
  async register(user) {
    const { username, password } = user;
    const sql = 'INSERT INTO `users`(`name`, `password`) VALUES (?, ?);';
    const result = await conn.execute(sql, [username, password]);
    return result;
  }

  async queryByName(user) {
    const { username, password } = user;
    const sql = 'SELECT * FROM users WHERE `name` = ?;';
    const result = await conn.execute(sql, [username])
    return result[0];
  }

  async InitUserInfo(payload) {
    const { user_id, name, university, address, avatar, email } = payload;
    const sql = 'INSERT INTO `user_info`(`user_id`, `name`, `university`, `address`, `avatar`, `email`) VALUES (?, ?, ?, ?);';
    const result = await conn.execute(sql, [user_id, name, university, address, avatar, email]);
    return result;
  }

  async queryProfileByUserId(id) {
    const sql = 'SELECT * FROM `user_info` WHERE `user_id` = ?;';
    const result = await conn.execute(sql, [id]);
    return result[0];
  }
}

module.exports = new UserService();