import { type Vector3 } from "../../common/utils/vector3Utils";

export class Vertex {
  public static getRotated(vertex: Vector3, rotationVector: Vector3): Vector3 {
    const { x: rotationY, y: rotationX, z: rotationZ } = rotationVector;
    const { x, y, z } = vertex;

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosZ = Math.cos(rotationZ);
    const sinZ = Math.sin(rotationZ);

    return {
      x:
        (cosX * cosZ + sinX * sinY * sinZ) * x +
        (-cosX * sinZ + sinX * sinY * cosZ) * y +
        sinX * cosY * z,
      y: cosY * sinZ * x + cosY * cosZ * y + -sinY * z,
      z:
        (-sinX * cosZ + cosX * sinY * sinZ) * x +
        (sinX * sinZ + cosX * sinY * cosZ) * y +
        cosX * cosY * z,
    };
  }

  public static getTranslated(vertex: Vector3, offset: Vector3): Vector3 {
    const { x: offsetX, y: offsetY, z: offsetZ } = offset;
    const { x, y, z } = vertex;

    return { x: x + offsetX, y: y + offsetY, z: z + offsetZ };
  }

  public static getScaled(vertex: Vector3, scalar: Vector3) {
    const { x: scaleX, y: scaleY, z: scaleZ } = scalar;
    const { x, y, z } = vertex;

    return { x: x * scaleX, y: y * scaleY, z: z * scaleZ };
  }
}
