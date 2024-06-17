import { IImage } from "../types";
import { KeyImage } from "../keys";

class SceneUtilService {
  constructor() {}

  addStaticImage(objStaticImage: IImage): void {
    const { scene, x, y, key } = objStaticImage;
    scene.add.image(x, y, key).setOrigin(0, 0);
  }

  addDynamicImage(objStaticImage: IImage): void {
    const { scene, x, y, key , flip } = objStaticImage;
    scene.add.image(x, y, key).setFlipX(flip ?? false);
  }

  addBackground(scene: Phaser.Scene, key: KeyImage): void {
    scene.add.image(0, 0, key).setOrigin(0, 0)
  }

  getStaticImage(objStaticImage: IImage) {
    const { scene, x, y, key } = objStaticImage;
    return scene.add.image(x, y, key).setOrigin(0, 0);
  }

  getDynamicImage(objStaticImage: IImage) {
    const { scene, x, y, key , flip } = objStaticImage;
    return scene.add.image(x, y, key).setFlipX(flip ?? false);
  }
}

export const SceneUtil = new SceneUtilService();
