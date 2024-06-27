import { GameObjects } from "phaser";

import { IImage } from "../types";
import { KeyImage } from "../keys";

class SceneUtilService {
  constructor() {}

  public addStaticImage(objStaticImage: IImage): void {
    const { scene, x, y, assetKey } = objStaticImage;
    scene.add.image(x, y, assetKey).setOrigin(0, 0);
  }

  public addBackground(scene: Phaser.Scene, key: KeyImage): void {
    scene.add.image(0, 0, key).setOrigin(0, 0)
  }

  public getStaticImage(objStaticImage: IImage): GameObjects.Image {
    const { scene, x, y, assetKey } = objStaticImage;
    return scene.add.image(x, y, assetKey).setOrigin(0, 0);
  }

  public getDynamicImage(objStaticImage: IImage): GameObjects.Image {
    const { scene, x, y, assetKey , flip } = objStaticImage;
    return scene.add.image(x, y, assetKey).setFlipX(flip ?? false);
  }
}

export const SceneUtil = new SceneUtilService();
