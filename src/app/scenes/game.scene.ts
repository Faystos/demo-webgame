import { Scene } from "phaser";

import { EScene } from "../types/scene";

import { KeyImage } from "../keys";
import { SceneUtil } from "../services";

export class GameScene extends Scene {
  sceneUtil = SceneUtil;
  constructor() {
    super(EScene.GAME)
  }

  preload() {}

  create() {
    this.renderBackground();
  }

  private renderBackground() {
    this.sceneUtil.addStaticImage({
      scene: this,
      x: 0,
      y: 0,
      key: KeyImage.BG_FOREST
    });
  }
}
