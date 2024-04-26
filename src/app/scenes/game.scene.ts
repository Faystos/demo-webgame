import { Scene } from "phaser";



import { KeyScene } from "../keys";
import { SceneUtil } from "../services";

export class GameScene extends Scene {
  sceneUtil = SceneUtil;
  constructor() {
    super(KeyScene.GAME)
  }

  preload() {}

  create() {}


}
