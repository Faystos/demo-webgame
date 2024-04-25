import { Scene } from "phaser";

import { EScene } from "../types/scene";

import { KeyImage } from "../keys";

export class GameScene extends Scene {
  constructor() {
    super(EScene.GAME)
  }

  preload() {}

  create() {
    this.renderBackground();
  }

  private renderBackground() {
    this.add.sprite(0, 0, KeyImage.BG_FOREST).setOrigin(0);
  }
}
