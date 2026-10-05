import { Random } from '../../../common/utils/random';
import { Animations } from '../../animations/animationsManager';
import { Renderer } from '../../renderEngine';
import { cubePrefab } from '../prefab/cube';

const cube1 = cubePrefab
  .registerInstance({
    position: {
      x: 1,
      y: 1,
      z: 1,
    },
    rotation: {
      x: 1,
      y: 1,
      z: 1,
    },
    scale: {
      x: 1.25,
      y: 1.25,
      z: 1.25,
    },
  })
  .animate('test');

const cube2 = cubePrefab.registerInstance().animate('rotate');

const randomCubes = [];

for (let i = 0; i < 200; ++i) {
  const randomCube = cubePrefab
    .registerInstance({
      position: {
        x: Random.floatRange(-20, 20),
        y: Random.floatRange(-10, 10),
        z: Random.floatRange(-10, 10),
      },
      rotation: {
        x: Random.floatRange(0, 360),
        y: Random.floatRange(0, 360),
        z: Random.floatRange(0, 360),
      },
      scale: {
        x: Random.floatRange(0, 5),
        y: Random.floatRange(0, 5),
        z: Random.floatRange(0, 5),
      },
    })
    .animate('rotate');

  randomCubes.push(randomCube);
}

console.log(JSON.stringify(randomCubes[100]));
