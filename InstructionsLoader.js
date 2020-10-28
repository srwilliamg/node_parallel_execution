const fs = require('fs').promises;
const config = require('./config/config.json');

module.exports = class InstructionsLoader {
  constructor() {
    this.amountFiles = config.amountFiles;
  }

  getAllDeliveryRoutes() {
    try {
      const files = [...Array(this.amountFiles)];

      return Promise.all(
        files.map(async (v, i) => await this.getDeliveryRoutes(i+1))
      );

    } catch (error) {
      console.log(error);
    }
  }

  async getDeliveryRoutes(fileIndex) {
    const inputName = ("0" + fileIndex).slice(-2);
    const inputContent = await this.loadFile(`${config.inputRoute}input${inputName}.txt`);
    const directions = inputContent.toString().split(config.endOfInstruction);
    return directions;
  }

  async loadFile(route) {
    const data = await fs.readFile(route, "utf8");
    return data;
  }
};