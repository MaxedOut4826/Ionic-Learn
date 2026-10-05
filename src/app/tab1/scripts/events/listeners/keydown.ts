import { MovementVector } from '../../common/constants/movementVector';
import { RotationVector } from '../../common/constants/rotationVector';
import { Camera } from '../../renderPipeline/camera';

const KEYBINDS: Record<string, () => void> = {
  w: () => Camera.move(MovementVector.forward),
  s: () => Camera.move(MovementVector.backward),
  a: () => Camera.move(MovementVector.left),
  d: () => Camera.move(MovementVector.right),
  Space: () => Camera.move(MovementVector.up),
  Shift: () => Camera.move(MovementVector.down),
  ArrowRight: () => Camera.rotate(RotationVector.yawRight),
  ArrowLeft: () => Camera.rotate(RotationVector.yawLeft),
  ArrowUp: () => Camera.rotate(RotationVector.pitchUp),
  ArrowDown: () => Camera.rotate(RotationVector.pitchDown),
};

document.addEventListener('keydown', ({ key }) => {
  const action = KEYBINDS[key];

  action();
});
