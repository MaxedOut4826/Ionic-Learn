import { type Vector3, Vector3Utils } from '../../common/utils/vector3Utils';
import { Camera } from '../camera';
import { Vertex } from './vertexTransformations';
import { Prefab } from './prefabsManager';
import { ObjectTransformationMatrix } from '../../common/types/objects';


export class ObjectInstance {
  public static instances: ObjectInstance[] = [];
  
  public prefab: Prefab;
  public transformations: ObjectTransformationMatrix;
  public animations: string[];

  public constructor(
    prefab: Prefab,
    transformations: Partial<ObjectTransformationMatrix> = {},
  ) {
    this.prefab = prefab;

    this.transformations = {
      position: transformations.position ?? { x: 0, y: 0, z: 0 },
      rotation: transformations.rotation ?? { x: 0, y: 0, z: 0 },
      scale: transformations.scale ?? { x: 1, y: 1, z: 1 },
    };

    this.animations = [];

    console.info('New object instance registered');

    ObjectInstance.instances.push(this);
  }

  public teleport(position: Vector3): void {
    this.transformations.position = position;
  }

  public setRotation(rotation: Vector3): void {
    this.transformations.rotation = rotation;
  }

  public setSize(size: Vector3): void {
    this.transformations.scale = size;
  }

  public move(offset: Vector3): void {
    const position = this.transformations.position;

    this.transformations.position = {
      x: position.x + offset.x,
      y: position.y + offset.y,
      z: position.z + offset.z,
    };
  }

  public rotate(rotation: Vector3): void {
    const currentRotation = this.transformations.rotation;

    this.transformations.rotation = {
      x: currentRotation.x + rotation.x,
      y: currentRotation.y + rotation.y,
      z: currentRotation.z + rotation.z,
    };
  }

  public grow(growth: Vector3): void {
    const scale = this.transformations.scale;

    this.transformations.scale = {
      x: scale.x + growth.x,
      y: scale.y + growth.y,
      z: scale.z + growth.z,
    };
  }

  public getVertices(): Vector3[] {
    return this.prefab.geometry.vertices;
  }

  public getTransformedVertices(): Vector3[] {
    const invertedCameraRotation: Vector3 = {
      x: -Camera.rotation.x,
      y: -Camera.rotation.y,
      z: -Camera.rotation.z,
    };

    const { position, rotation, scale } = this.transformations;

    return this.getVertices().map((point) => {
      let vertex = point;

      vertex = Vertex.getScaled(vertex, scale);
      vertex = Vertex.getRotated(vertex, rotation);
      vertex = Vertex.getTranslated(vertex, position);
      vertex = Vector3Utils.subtract(vertex, Camera.position);
      vertex = Vertex.getRotated(vertex, invertedCameraRotation);

      return vertex;
    });
  }

  public animate(id: string): void {
    this.animations.push(id);
  }
}
