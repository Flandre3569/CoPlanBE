const fs = require('fs');
const path = require('path');

const routerAsync = function() {
  const targetPath = path.resolve(__dirname, '../router')
  fs.readdirSync(targetPath).forEach((file) => {
    const router = require(`${targetPath}/${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = routerAsync;