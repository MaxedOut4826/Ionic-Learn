import { Renderer } from './renderPipeline/renderEngine';

export async function main() {
  console.info('Scripts started');

  await import('./renderPipeline/animations/index');
  await import('./renderPipeline/objects/index');
  await import('./events/index');

  Renderer.startRenderLoop();
}