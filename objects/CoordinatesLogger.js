const { outputRoute } = require('../config/config.json');
const FileManager = require('./FileManager');
const { SEPARATOR } = require('../utils/Constants').directions.OUTPUT;

module.exports = class CoordinatesWriter {
  constructor() {
    this.fileManager = new FileManager();
  }

  transformId = (id) => ("0" + id).slice(-2);

  async printCoordinates(droneId, content) {
    const outputNumber = this.transformId(droneId);
    const route = `${outputRoute}out${outputNumber}.txt`;
    const data = this.fileManager.writeFile(route, content);
    return data;
  }

  async printSeparator(droneId) {
    const outputNumber = this.transformId(droneId);
    const route = `${outputRoute}out${outputNumber}.txt`;
    const data = this.fileManager.writeFile(route, SEPARATOR);
    return data;
  }
};