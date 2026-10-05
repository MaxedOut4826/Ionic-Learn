import { type Vector3 } from '../common/utils/vector3Utils';
import { type Vector2 } from '../common/utils/vector2Utils';
import { Polygon } from '../common/types/objects';
import { Animations } from './animations/animationsManager';
import { Camera } from './camera';
import { Diagnostics } from './diagnostics';
import { ObjectInstance } from './objects/objectsManager';
import { screenConfig } from '../common/constants/screenConfig';

export class Renderer {
  public static frameRate = 0;
  public static frameIteration = 0;
  public static maxFrameRate = 1000;
  public static frameStartTime = Date.now();
  public static frameEndTime: number | null = null;
  public static deltaTime = 1 / Renderer.maxFrameRate;
  public static aspectRatio = -1;

  public static renderQueue: ObjectInstance[] = [];
  public static screenSize: Vector2 = { x: 0, y: 0 };

  public static screenElement: HTMLCanvasElement | null = null;
  public static screen: CanvasRenderingContext2D | null = null;

  public static init(canvas: HTMLCanvasElement): void {
    Renderer.screenElement = canvas;
    Renderer.screen = canvas.getContext('2d');
    if (!Renderer.screen) {
      throw new Error('2D canvas context unavailable');
    }

    Renderer.screen.fillStyle = screenConfig.colours.background;
    Renderer.screen.strokeStyle = screenConfig.colours.default;
    Renderer.resizeScreen();
  }

  public static startRenderLoop(): void {
    setInterval(() => {
      Renderer.resizeScreen();
      Renderer.renderFrame();
    }, Renderer.deltaTime * 1000);
  }

  private static renderFrame(): void {
    Renderer.clearScreen();
    Renderer.frameStartTime = Renderer.frameEndTime ?? Renderer.frameStartTime;
    Renderer.frameIteration++;
    Renderer.renderQueue = ObjectInstance.instances;

    for (const object of Renderer.renderQueue) {
      Renderer.renderObject(object);
    }

    Diagnostics.updateFrameDiagnostics();
    Diagnostics.writeFrameDiagnostics();
  }

  public static drawLine(vector1: Vector2, vector2: Vector2): void {
    Renderer.screen!.beginPath();
    Renderer.screen!.moveTo(vector1.x, vector1.y);
    Renderer.screen!.lineTo(vector2.x, vector2.y);
    Renderer.screen!.stroke();
  }

  public static drawPolygon(...vertices: Vector2[]) {
    Renderer.screen!.beginPath();
    Renderer.screen!.moveTo(vertices[0].x, vertices[0].y);

    for (let i = 1; i < vertices.length; ++i) {
      const { x, y } = vertices[i];
      Renderer.screen!.lineTo(x, y);
    }

    Renderer.screen!.closePath();
    Renderer.screen!.stroke();
  }

  public static renderPolygon(polygon: Polygon): void {
    const { vertices, indices } = polygon;
    const vertex0 = vertices[indices[0]];
    
    if (indices.length > 2) {
      for (let i = 1; i < indices.length - 1; ++i) {
        const index1 = indices[i];
        const index2 = indices[i + 1];
        const vertex1 = vertices[index1];
        const vertex2 = vertices[index2];
        if (vertex1 === undefined || vertex2 === undefined) {
          continue;
        }

        const clippedEdge0 = Renderer.screenNearPlaneClip(vertex0, vertex1);
        if (clippedEdge0 === undefined) {
          continue;
        }

        const clippedEdge1 = Renderer.screenNearPlaneClip(vertex1, vertex2);
        if (clippedEdge1 === undefined) {
          continue;
        }

        Renderer.drawPolygon(
          Renderer.screenProject(clippedEdge0[0]),
          Renderer.screenProject(clippedEdge0[1]),
          Renderer.screenProject(clippedEdge1[1]),
        );
      }
      return;
    }

    const vertex1 = vertices[indices[1]];
    const clippedEdge = Renderer.screenNearPlaneClip(vertex0, vertex1);
    if (clippedEdge === undefined) {
      return;
    }

    Renderer.drawLine(
      Renderer.screenProject(clippedEdge[0]),
      Renderer.screenProject(clippedEdge[1]),
    );
  }

  public static renderObject(object: ObjectInstance): void {
    Animations.animateEntity(object);

    for (const polygon of object.prefab.geometry.indices) {
      Renderer.renderPolygon({
        vertices: object.getTransformedVertices(),
        indices: polygon,
      });
    }
  }

  public static drawText(text: string, vector: Vector2, size: number): void {
    Renderer.screen!.font = `${size}px Arial`;
    Renderer.screen!.strokeText(text, vector.x, vector.y);
  }

  public static clearScreen(): void {
    Renderer.screen!.clearRect(
      0,
      0,
      Renderer.screenSize.x,
      Renderer.screenSize.y,
    );
  }

  private static screenNearPlaneClip(
    p0: Vector3,
    p1: Vector3,
  ): [Vector3, Vector3] | undefined {
    const threshold = screenConfig.clipping.nearPlaneThreshold;
    const dz0 = p0.z - Camera.position.z;
    const dz1 = p1.z - Camera.position.z;
    const p0Inside = dz0 > threshold;
    const p1Inside = dz1 > threshold;

    if (!p0Inside && !p1Inside) {
      return undefined;
    }

    if (p0Inside && p1Inside) {
      return [p0, p1];
    }

    const t = (threshold - dz0) / (dz1 - dz0);
    const intersection: Vector3 = {
      x: p0.x + (p1.x - p0.x) * t,
      y: p0.y + (p1.y - p0.y) * t,
      z: p0.z + (p1.z - p0.z) * t,
    };

    return p0Inside ? [p0, intersection] : [intersection, p1];
  }

  private static screenProject(vector: Vector3): Vector2 {
    const dx = vector.x - Camera.position.x;
    const dy = vector.y - Camera.position.y;
    const dz = vector.z - Camera.position.z;

    return {
      x: Math.floor(
        (dx / dz / Renderer.aspectRatio + 1) *
          0.5 *
          (Renderer.screenSize.x - 1),
      ),
      y: Math.floor((1 - dy / dz) * 0.5 * (Renderer.screenSize.y - 1)),
    };
  }

  public static resizeScreen(): void {
    const rectangle = Renderer.screenElement!.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio;
    const width = rectangle.width * devicePixelRatio;
    const height = rectangle.height * devicePixelRatio;

    Renderer.screenElement!.width = width;
    Renderer.screenElement!.height = height;
    Renderer.aspectRatio = width / height;
    Renderer.screenSize = { x: width, y: height };
    Renderer.screen!.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0,
    );
  }
}
