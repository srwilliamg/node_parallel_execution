const fs = require('fs').promises;
const config = require('../config/config.json');

module.exports = class FileManager {
  constructor() {}

  transformId = (id) => ("0" + id).slice(-2);

  async loadFile(droneId) {
    const inputNumber = this.transformId(droneId);
    const route = `${config.inputRoute}in${inputNumber}.txt`;
    const data = await fs.readFile(route, "utf8");
    return data;
  }

  async writeFile(route, content) {
    const data = await fs.appendFile(route, content);
    return data;
  }
};