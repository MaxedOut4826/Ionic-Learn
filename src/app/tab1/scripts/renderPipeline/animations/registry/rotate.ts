import { ObjectInstance } from '../../objects/objectsManager';
import { Renderer } from '../../renderEngine';
import { Animations } from '../animationsManager';

Animations.register('rotate', (object: ObjectInstance) => {
  object.rotate({
    x: 3 * Renderer.deltaTime,
    y: 3 * Renderer.deltaTime,
    z: 3 * Renderer.deltaTime,
  });
});
