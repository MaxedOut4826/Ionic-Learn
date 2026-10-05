import {
  Geometry,
  ObjectTransformationMatrix,
} from '../../common/types/objects';
import { ObjectInstance } from './objectsManager';

export class Prefab {
  public static prefabs: Prefab[] = [];

  public geometry: Geometry;

  public constructor(geometry: Geometry) {
    this.geometry = geometry;
    Prefab.prefabs.push(this);
    console.info('New prefab registered');
  }

  public registerInstance(
    transformations?: ObjectTransformationMatrix,
  ): ObjectInstance {
    return new ObjectInstance(this, transformations);
  }
}
