import { ObjectInstance } from '../../objects/objectsManager';
import { Renderer } from '../../renderEngine';
import { Animations } from '../animationsManager';

Animations.register('rotate', (object: ObjectInstance) => {
  object.rotate({
    x: 1 * Renderer.deltaTime,
    y: 1 * Renderer.deltaTime,
    z: 0 * Renderer.deltaTime,
  });
});
