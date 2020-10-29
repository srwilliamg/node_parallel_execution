const { amountFiles, endOfInstruction, amountOfOrders } = require('../config/config.json');
const FileManager = require('./FileManager');

module.exports = class InstructionsLoader {
  constructor() {}

  getAllDeliveryRoutes() {
    try {
      const files = [...Array(amountFiles)];

      return Promise.all(
        files.map(async (v, i) => await this.getDeliveryRoutes(i + 1))
      );

    } catch (error) {
      console.log(error);
    }
  }

  async getDeliveryRoutes(fileIndex) {
    const fileManager = new FileManager();
    const inputContent = await fileManager.loadFile(fileIndex);
    let directions = inputContent.toString().split(endOfInstruction);
    directions = directions.splice(0, amountOfOrders);
    return directions;
  }

};