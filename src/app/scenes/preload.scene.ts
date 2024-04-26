import { Scene } from "phaser";

import {
  KeyAssets,
  KeyHealthBar,
  KeyImage,
  KeyMonster,
  KeyScene
} from "../keys";
import {SceneUtil} from "../services";

export class PreloadScene extends Scene {
  sceneUtil = SceneUtil;

  constructor() {
    super(KeyScene.PRELOAD)
  }

  preload() {
    this.loadImage();
  }

  create() {
    this.renderBackground();
    this.scene.start(KeyScene.BATTLE);
  }

  private loadImage() {
    // background
    this.load.image(
      KeyImage.BG_FOREST,
      `${ KeyAssets.URI_MONSTER_TAMER }battle-backgrounds/forest-background.png`
    );

    this.load.image(
      KeyImage.BG_HEALTH_BAR,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/custom-ui.png`
    );

    // health bar

    this.load.image(
      KeyHealthBar.LEFT_CAP,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_green_left.png`
    );

    this.load.image(
      KeyHealthBar.MIDDLE_CAP,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_green_mid.png`
    );

    this.load.image(
      KeyHealthBar.RIGHT_CAP,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_green_right.png`
    );

    // monsters

    this.load.image(
      KeyMonster.CARNODUSK,
      `${ KeyAssets.URI_MONSTER_TAMER }monsters/carnodusk.png`
    );

    this.load.image(
      KeyMonster.IGUANIGNITE,
      `${ KeyAssets.URI_MONSTER_TAMER }monsters/iguanignite.png`
    );
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
