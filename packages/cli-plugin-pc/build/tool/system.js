
const os = require('os');

const addressTool = {
  getLocalIP() {
    let IP = '';
    try {
      // 获得网络接口列表
      let networks = os.networkInterfaces();
      for (let dev in networks) {
        const iface = networks[dev];
        iface.forEach(alias => {
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            IP = alias.address;
          }
        })
      }
    } catch (e) {
      IP = '127.0.0.1';
    }
    return IP;
  }
}
module.exports = {
  addressTool
}
