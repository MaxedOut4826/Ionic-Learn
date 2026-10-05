import { Prefab } from '../../renderPipeline/prefabsManager';

type Vertices = Vector3[];
type Indices = number[][];

interface Geometry {
  vertices: Vertices;
  indices: Indices;
}

interface Polygon {
  vertices: Vertices;
  indices: number[];
};

interface ObjectTransformationMatrix {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
}

interface ObjectInstanceData {
  prefab: Prefab;
  transformations: ObjectTransformationMatrix;
  animations: string[];
}
