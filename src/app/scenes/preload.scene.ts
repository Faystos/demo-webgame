import { Scene } from "phaser";

import {
  KeyAssets,
  KeyCursor,
  KeyData,
  KeyHealthBar,
  KeyImage,
  KeyMonster,
  KeyScene
} from "../keys";
import { SceneUtil } from "../services";

export class PreloadScene extends Scene {
  sceneUtil = SceneUtil;

  constructor() {
    super(KeyScene.PRELOAD)
  }

  preload() {
    this.loadImage();
    this.loadData();
  }

  create() {
    this.renderBackground();
    this.scene.start(KeyScene.BATTLE);
  }

  private loadImage() {
    this.loadImageBackground();
    this.loadImageHealthBar();
    this.loadImageMonsters();
    this.loadImageCursor();
  }

  private loadImageBackground () {
    // background
    this.load.image(
      KeyImage.BG_FOREST,
      `${ KeyAssets.URI_MONSTER_TAMER }battle-backgrounds/forest-background.png`
    );
    this.load.image(
      KeyImage.BG_HEALTH_BAR,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/custom-ui.png`
    );
  }

  private loadImageHealthBar () {
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
    this.load.image(
      KeyHealthBar.LEFT_CAP_SHADOW,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_shadow_left.png`
    );
    this.load.image(
      KeyHealthBar.MIDDLE_CAP_SHADOW,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_shadow_mid.png`
    );
    this.load.image(
      KeyHealthBar.RIGHT_CAP_SHADOW,
      `${ KeyAssets.URI_KENNEYS_ASSETS }ui-space-expansion/barHorizontal_shadow_right.png`
    );
  }

  private loadImageMonsters() {
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

  private loadImageCursor() {
    // cursor
    this.load.image(
      KeyCursor.CURSOR,
      `${ KeyAssets.URI_MONSTER_TAMER }ui/cursor.png`
    )
  }

  private loadData() {
    this.load.json(
      KeyData.ATTACK,
      `${KeyAssets.URI_DATA_ASSETS}/attacks.json`
    )
  }

  private renderBackground() {
    this.sceneUtil.addStaticImage({
      scene: this,
      x: 0,
      y: 0,
      assetKey: KeyImage.BG_FOREST
    });
  }
}
