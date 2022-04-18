const conn = require('../app/database');

class SubscribeService {
  async subscribe(email) {
    const sql = 'INSERT INTO `subscribe`(`email`) VALUES(?);';
    const result = await conn.execute(sql, [email]);
    return result[0];
  }
}

module.exports = new SubscribeService();