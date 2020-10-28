const Drone = require('./objects/Drone');
const config = require('./config/config.json');

const amountOfDrones = [...Array(config.amountFiles)];

try {
  let Drones = amountOfDrones.map((v, i) => {
    return new Drone(0, 0, i + 1);
  })

  const loadedDeliveryRoutes = Promise.all(
    Drones.map(async (drone, i) => {
      return await drone.loadDeliveryRoutes();
    })
  );

  loadedDeliveryRoutes.then(res => {
    Drones.map(async v => {
      await v.stepForward();        
    });
  });

} catch (error) {
  console.error(error);
}