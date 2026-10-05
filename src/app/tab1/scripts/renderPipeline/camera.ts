import { type Vector3 } from "../common/utils/vector3Utils";

export class Camera {
  public static position = {
    x: 0,
    y: 0,
    z: -10,
  };

  public static rotation = {
    x: 0,
    y: 0,
    z: 0,
  };

  public static fov = 90;

  public static move(movementVector: Vector3): void {
    return;
  }

  public static rotate(rotationVector: Vector3): void {
    return;
  }
}
