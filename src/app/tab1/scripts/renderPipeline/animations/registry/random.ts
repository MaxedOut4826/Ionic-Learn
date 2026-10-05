import { ObjectInstance } from '../../objects/objectsManager';
import { Renderer } from '../../renderEngine';
import { Animations } from '../animationsManager';

Animations.register('test', (object: ObjectInstance) => {
  object.rotate({
    x: 5 * Renderer.deltaTime,
    y: 100 * Renderer.deltaTime,
    z: 5 * Renderer.deltaTime,
  });
  object.move({
    x: Math.random() * Renderer.deltaTime,
    y: Math.random() * Renderer.deltaTime,
    z: Math.random() * Renderer.deltaTime,
  });
});
