import { Scene, GameObjects } from "phaser";

import {
  KeyHealthBar,
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
    this.renderHealthBar();
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

  private renderHealthBar() {
    this.createHealthBar({ text: KeyMonster.IGUANIGNITE, x: 556, y: 318, enemy: false });
    this.createHealthBar({ text: KeyMonster.CARNODUSK, x: 0, y: 0, enemy: true });
  }

  private createHealthBar(objHealthBar: { text: string, x: number, y: number, enemy: boolean }) {
    const { text, x, y , enemy} = objHealthBar;
    // texts container
    const monsterName = this.add.text(30, 20, text, { color: '#7E3D3F', fontSize: '32px' });
    const monsterLevel = this.add.text(monsterName.width + 35, 23, 'L5', { color: '#ED474B', fontSize: '28px' });
    const healthPointText = this.add.text(30, 55, 'HP', { color: '#FF6505', fontSize: '24px', fontStyle: 'italic' });
    const healthPointLevel = this.add.text(443, 80, '25/25', { color: '#7E3D3F', fontSize: '16px' })
      .setOrigin(1, 0);
    // container children
    const textList = !enemy ?
    [
      monsterName,
      monsterLevel,
      healthPointText,
      healthPointLevel,
    ] :
    [
      monsterName,
      monsterLevel,
      healthPointText,
    ];
    // background image
    const bgHealthBar = !enemy ? this.sceneUtil.getStaticImage({ scene: this, x: 0, y:0, key: KeyImage.BG_HEALTH_BAR}) :
      this.sceneUtil.getStaticImage({ scene: this, x: 0, y:0, key: KeyImage.BG_HEALTH_BAR}).setScale(1, .8);

    const containerChildren: GameObjects.GameObject[] = [
      bgHealthBar,
      this.createHealth(34, 34),
      ...textList
    ];
    // container
    this.add.container(x, y, containerChildren);
  }

  private createHealth(x: number, y: number) {
    const scaleY = 0.7;

    const healthLeft = this.sceneUtil.getDynamicImage({
      scene: this, x, y, key: KeyHealthBar.LEFT_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);

    const middleLeft = this.sceneUtil.getDynamicImage({
      scene: this,
      x: healthLeft.x + healthLeft.width,
      y,
      key: KeyHealthBar.MIDDLE_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);
    middleLeft.displayWidth = 360;

    const rightLeft = this.sceneUtil.getDynamicImage({
      scene: this,
      x: middleLeft.x + middleLeft.displayWidth,
      y,
      key: KeyHealthBar.RIGHT_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [
      healthLeft,
      middleLeft,
      rightLeft
    ]);
  }
}
