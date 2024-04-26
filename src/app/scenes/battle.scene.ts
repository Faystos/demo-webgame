import { Scene } from "phaser";

import {
  KeyImage,
  KeyMonster,
  KeyScene
} from "../keys";
import { SceneUtil } from "../services";
import { IImage } from "../types";

export class BattleScene extends Scene {
  private readonly sceneUtil = SceneUtil;

  constructor() {
    super(KeyScene.BATTLE);
  }

  create() {
    this.renderBackground();
    this.renderMonsters();
  }

  private renderBackground() {
    this.sceneUtil.addStaticImage({
      scene: this,
      x: 0,
      y: 0,
      key: KeyImage.BG_FOREST
    });
  }

  private renderMonsters() {
    this.createMonster({ scene: this,  x: 768, y: 144, key: KeyMonster.CARNODUSK, flip: false });
    this.createMonster({ scene: this, x: 256, y: 316, key: KeyMonster.IGUANIGNITE, flip: true });
  }

  private createMonster(obfMonster: IImage) {
    const { scene, x, y, key, flip } = obfMonster;
    this.sceneUtil.addDynamicImage({ scene, x, y, key, flip });
  }
}
