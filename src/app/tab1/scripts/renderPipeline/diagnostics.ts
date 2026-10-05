import { Renderer } from './renderEngine';
import { clamp } from '../common/utils/clamp';

export class Diagnostics {
  public static updateFrameDiagnostics(): void {
    Renderer.frameEndTime = Date.now();
    Renderer.deltaTime =
      (Renderer.frameEndTime - Renderer.frameStartTime) / 1000;
    Renderer.frameRate = clamp(
      1 / Renderer.deltaTime,
      0,
      Renderer.maxFrameRate,
    );
  }

  public static writeFrameDiagnostics(): void {
    const screenY = Renderer.screenSize.y;

    Renderer.drawText(
      `FPS ${Renderer.frameRate.toFixed(1)} / ${Renderer.maxFrameRate}`,
      {
        x: 10,
        y: screenY - 60,
      },
      25,
    );

    Renderer.drawText(
      `Delta ${Renderer.deltaTime}`,
      {
        x: 10,
        y: screenY - 85,
      },
      25,
    );

    Renderer.drawText(
      `Iteration ${Renderer.frameIteration}`,
      {
        x: 10,
        y: screenY - 110,
      },
      25,
    );
  }
}
