import { ObjectInstance } from "../../renderPipeline/prefabsManager";
import { ObjectTransformationMatrix } from "./objects";

type AnimationExpression = (
  object: ObjectInstance,
) => void;
