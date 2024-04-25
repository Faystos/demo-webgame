import { Scene } from "phaser";

import { EScene } from "../types/scene";
import {
  KeyAssets,
  KeyHealthBar,
  KeyImage,
  KeyMonster
} from "../keys";

export class PreloadScene extends Scene {

  constructor() {
    super(EScene.PRELOAD)
  }

  preload() {
    this.loadImage();
  }

  create() {
    this.scene.start(EScene.GAME);
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
}
