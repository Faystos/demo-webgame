import { Scene } from "phaser";

interface IStaticImage {
  scene: Scene;
  x: number;
  y:number;
  key: string
}

class SceneUtilService {
  constructor() {}
  addStaticImage(objStaticImage: IStaticImage) {
    const { scene, x, y, key } = objStaticImage;
    scene.add.image(x, y, key).setOrigin(0, 0);
  }
}

export const SceneUtil = new SceneUtilService();
