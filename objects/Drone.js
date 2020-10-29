const DIRECTIONS = require('../utils/Constants').directions;
const MOVEMENT = require('../utils/Constants').movement;
const InstructionLoader = require('./InstructionsLoader');
const CoordinatesLogger = require('./CoordinatesLogger');

module.exports = class Drone {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = DIRECTIONS.NORTH;
    this.deliveryRoutes = null;
    this.actualDelivery = null;
    this.actualMove = null;
    this.coordinatesLogger = new CoordinatesLogger();
  }

  async loadDeliveryRoutes() {
    const il = new InstructionLoader();
    const routes = await il.getDeliveryRoutes(this.id);
    this.deliveryRoutes = routes;
    await this.coordinatesLogger.printHeader(this.id);
    return routes;
  }

  transformDirection(direction) {
    if (direction == DIRECTIONS.NORTH) {
      return DIRECTIONS.OUTPUT.NORTH;
    }
    else if (direction == DIRECTIONS.SOUTH) {
      return DIRECTIONS.OUTPUT.SOUTH;
    }
    else if (direction == DIRECTIONS.EAST) {
      return DIRECTIONS.OUTPUT.EAST;
    }
    else if (direction == DIRECTIONS.WEST) {
      return DIRECTIONS.OUTPUT.WEST;
    }

    return 0;
  }

  async stepForward() {
    while (this.deliveryRoutes != null && this.deliveryRoutes.length !== 0 || this.actualDelivery != null && this.actualDelivery.length !== 0) {

      if (this.actualDelivery == null || this.actualDelivery.length == 0) {
        this.actualDelivery = this.deliveryRoutes.shift().split('');
      }

      if (this.actualMove == null) {
        this.actualMove = this.actualDelivery.shift();
      }

      if (!this.findDirection(this.actualMove)) {
        if (this.direction == DIRECTIONS.NORTH) {
          this.y++;
        }
        else if (this.direction == DIRECTIONS.EAST) {
          this.x++;
        }
        else if (this.direction == DIRECTIONS.SOUTH) {
          this.y--;
        }
        else if (this.direction == DIRECTIONS.WEST) {
          this.x--;
        }
      }

      this.actualMove = null;

      if (this.actualDelivery == null || this.actualDelivery.length === 0) {
        const output = `(${this.x}, ${this.y}) direccion ${this.transformDirection(this.direction)}\n`;

        console.log(output);
        await this.coordinatesLogger.printCoordinates(this.id, output);

        if (this.deliveryRoutes == null || this.deliveryRoutes.length === 0) {
          this.goBackHome();
        }
      }
    }
    await this.coordinatesLogger.printSeparator(this.id);
  }

  findDirection(actualMove) {
    if (actualMove != MOVEMENT.FORWARD) {
      if (this.direction == DIRECTIONS.NORTH && actualMove == MOVEMENT.RIGHT) {
        this.direction = DIRECTIONS.EAST;
      }
      else if (this.direction == DIRECTIONS.EAST && actualMove == MOVEMENT.RIGHT) {
        this.direction = DIRECTIONS.SOUTH;
      }
      else if (this.direction == DIRECTIONS.SOUTH && actualMove == MOVEMENT.RIGHT) {
        this.direction = DIRECTIONS.WEST;
      }
      else if (this.direction == DIRECTIONS.WEST && actualMove == MOVEMENT.RIGHT) {
        this.direction = DIRECTIONS.NORTH;
      }
      else if (this.direction == DIRECTIONS.NORTH && actualMove == MOVEMENT.LEFT) {
        this.direction = DIRECTIONS.WEST;
      }
      else if (this.direction == DIRECTIONS.WEST && actualMove == MOVEMENT.LEFT) {
        this.direction = DIRECTIONS.SOUTH;
      }
      else if (this.direction == DIRECTIONS.SOUTH && actualMove == MOVEMENT.LEFT) {
        this.direction = DIRECTIONS.EAST;
      }
      else if (this.direction == DIRECTIONS.EAST && actualMove == MOVEMENT.LEFT) {
        this.direction = DIRECTIONS.NORTH;
      }

      return true;
    }

    return false;

  }

  goBackHome() {
    console.log('Coming back home...');
  }

};
