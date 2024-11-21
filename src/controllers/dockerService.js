const Docker = require('dockerode');
const docker = new Docker();

async function getContainerState(index) {
  return new Promise((resolve, reject) => {
    docker.listContainers({ all: true }, (err, containers) => {
      if (err) {
        reject(err);
      } else {
        if (containers.length > index) {
          const container = containers[index];
          resolve({
            name: container.Names[0], 
            status: container.State   
          });
        } else {
          resolve(null); 
        }
      }
    });
  });
}

module.exports = { getContainerState };
