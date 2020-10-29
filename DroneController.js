const Drone = require('./objects/Drone');
const config = require('./config/config.json');

class DroneController {
  constructor() {
    this.drones = null;
    this.deliveryRoutes = null;
    this.amountOfDrones = [...Array(config.amountFiles)];
  }

  initDrones() {
    this.drones = this.amountOfDrones.map((v, i) => {
      return new Drone(0, 0, i + 1);
    });

    this.loadDeliveryRoutes();
  }

  loadDeliveryRoutes(){
    this.deliveryRoutes = Promise.all(
      this.drones.map(async (drone, i) => {
        return await drone.loadDeliveryRoutes();
      })
    );
  }

  runDrones() {
    try {
      this.deliveryRoutes.then(res => {
        this.drones.map(async v => {
          await v.stepForward();
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
};

const droneController = new DroneController();
droneController.initDrones();
droneController.runDrones();