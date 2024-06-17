import {
  GameObjects,
  Scene
} from "phaser";

import { SceneUtil } from "../../services";

import {
  KeyHealthBar,
  KeyImage,
  KeyMonster
} from "../../keys";

export class HealthBarUi {
  private readonly scene!: Scene;
  private readonly sceneUtil = SceneUtil;

  constructor(scene: Scene) {
    this.scene = scene;
    this.renderHealthBar();
  }

  private renderHealthBar() {
    this.createHealthBar({ text: KeyMonster.IGUANIGNITE, x: 556, y: 318, enemy: false });
    this.createHealthBar({ text: KeyMonster.CARNODUSK, x: 0, y: 0, enemy: true });
  }

  private createHealthBar(objHealthBar: { text: string, x: number, y: number, enemy: boolean }) {
    const { text, x, y , enemy} = objHealthBar;
    // texts container
    const monsterName = this.scene.add.text(30, 20, text, { color: '#7E3D3F', fontSize: '32px' });
    const monsterLevel = this.scene.add.text(monsterName.width + 35, 23, 'L5', { color: '#ED474B', fontSize: '28px' });
    const healthPointText = this.scene.add.text(30, 55, 'HP', { color: '#FF6505', fontSize: '24px', fontStyle: 'italic' });
    const healthPointLevel = this.scene.add.text(443, 80, '25/25', { color: '#7E3D3F', fontSize: '16px' })
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
    const bgHealthBar = !enemy ? this.sceneUtil.getStaticImage({ scene: this.scene, x: 0, y:0, key: KeyImage.BG_HEALTH_BAR}) :
      this.sceneUtil.getStaticImage({ scene: this.scene, x: 0, y:0, key: KeyImage.BG_HEALTH_BAR}).setScale(1, .8);

    const containerChildren: GameObjects.GameObject[] = [
      bgHealthBar,
      this.createHealth(34, 34),
      ...textList
    ];
    // container
    this.scene.add.container(x, y, containerChildren);
  }

  private createHealth(x: number, y: number) {
    const scaleY = 0.7;

    const healthLeft = this.sceneUtil.getDynamicImage({
      scene: this.scene, x, y, key: KeyHealthBar.LEFT_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);

    const middleLeft = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: healthLeft.x + healthLeft.width,
      y,
      key: KeyHealthBar.MIDDLE_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);
    middleLeft.displayWidth = 360;

    const rightLeft = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: middleLeft.x + middleLeft.displayWidth,
      y,
      key: KeyHealthBar.RIGHT_CAP
    }).setOrigin(0, .5)
      .setScale(1, scaleY);

    return this.scene.add.container(x, y, [
      healthLeft,
      middleLeft,
      rightLeft
    ]);
  }
}
