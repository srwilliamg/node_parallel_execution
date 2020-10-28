const DIRECTIONS = require('./Utils/Constants').directions;
const MOVEMENT = require('./Utils/Constants').movement;
const InstructionLoader = require('./InstructionsLoader');

module.exports = class Drone {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = DIRECTIONS.NORTH;
    this.deliveryRoutes = null;
    this.actualDelivery = null;
    this.actualMove = null;
  }

  async loadDeliveryRoutes() {
    const il = new InstructionLoader();
    const routes = await il.getDeliveryRoutes(this.id);
    this.deliveryRoutes = routes;
    return routes;
  }

  async stepForward() {
    if (this.actualDelivery == null || this.actualDelivery.length == 0) {
      this.actualDelivery = this.deliveryRoutes.shift().split('');
    }

    if (this.actualMove == null) {
      this.actualMove = this.actualDelivery.shift();
    }

    if (!this.findDirection(this.actualMove)){
      if (this.direction === DIRECTIONS.NORTH) {
        this.y++;
      }
      else if (this.direction === DIRECTIONS.EAST) {
        this.x++;
      }
      else if (this.direction === DIRECTIONS.SOUTH) {
        this.y--;
      }
      else {
        this.x--;
      }
    }
    
    this.actualMove = null;

    if(this.actualDelivery == null || this.actualDelivery.length == 0){
      console.log("Position: ",this.x, this.y, this.direction);
      if(this.deliveryRoutes == null || this.deliveryRoutes.length == 0){
        this.goBackHome();
      }
    }
    else{
      console.log('Found deliveries: ', this.actualDelivery);
    }

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
    else {
      return false;
    }
  }

  goBackHome() {
    console.log('Coming back home...');
  }

};
