import { AnimationExpression } from '../../common/types/animations';
import { ObjectInstance } from '../objects/objectsManager';

export class Animations {
  public static animations: Record<string, AnimationExpression> = {};

  public static register(id: string, expression: AnimationExpression): void {
    if (id in Animations.animations) {
      throw new Error(
        `[${id}] Cannot register animation with duplicate identifier`,
      );
    }

    Animations.animations[id] = expression;
    console.info(`[${id}] Registered new animation`);
  }

  public static animateEntity(object: ObjectInstance): void {
    for (const animationId of object.animations) {
      const animation = Animations.animations[animationId];

      if (animation === undefined) {
        throw new Error(`[${animationId}] Animation does not exist`);
      }

      animation(object);
    }
  }
}
