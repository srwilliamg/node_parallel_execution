const Drone = require('./objects/Drone');
const { amountFiles } = require('./config/config.json');

class DroneController {
  constructor() {
    this.drones = null;
    this.deliveryRoutes = null;
  }

  initDrones() {
    this.drones = [];

    for (let i = 1; i <= amountFiles; i++) {
      this.drones.push(new Drone(0, 0, i));
    }

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