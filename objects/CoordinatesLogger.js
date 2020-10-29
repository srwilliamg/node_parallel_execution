const { outputRoute } = require('../config/config.json');
const FileManager = require('./FileManager');
const { SEPARATOR, HEADER } = require('../utils/Constants').directions.OUTPUT;

module.exports = class CoordinatesWriter {
  constructor() {
    this.fileManager = new FileManager();
  }

  transformId = (id) => ("0" + id).slice(-2);

  getRoute = (outputNumber) => `${outputRoute}out${outputNumber}.txt`;

  async printCoordinates(droneId, content) {
    const outputNumber = this.transformId(droneId);
    const data = this.fileManager.writeFile(this.getRoute(outputNumber), content);
    return data;
  }

  async printSeparator(droneId) {
    const outputNumber = this.transformId(droneId);
    const data = this.fileManager.writeFile(this.getRoute(outputNumber), SEPARATOR);
    return data;
  }

  async printHeader(droneId) {
    const outputNumber = this.transformId(droneId);
    const data = this.fileManager.writeFile(this.getRoute(outputNumber), HEADER);
    return data;
  }
};