import {
  GameObjects,
  Scene
} from "phaser";

import { SceneUtil } from "../../services";

import {
  KeyHealthBar,
  KeyImage,
  KeyMonster,
  KeyPerson
} from "../../keys";

export class HealthBarUi {
  private readonly scene!: Scene;
  private readonly sceneUtil = SceneUtil;

  private fullWidth = 360;
  private scaleY = 0.7;

  private leftCap!: GameObjects.Image;
  private middleCap!: GameObjects.Image;
  private rightCap!: GameObjects.Image;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public renderHealthBar(person: KeyPerson) {
    this.getPersonHealthBar()[person]();
    this.setMeterPercentage(1);
  }

  public setMeterPercentage(percent = 1) {
    this.middleCap.displayWidth = this.fullWidth * percent;
    this.rightCap.x = this.middleCap.x + this.middleCap.displayWidth;
  }

  private getPersonHealthBar(): { [key in KeyPerson]: ()=> void } {
    return {
      [KeyPerson.PLAYER]: () => this.createHealthBar({ text: KeyMonster.IGUANIGNITE, x: 556, y: 318, enemy: false }),
      [KeyPerson.ENEMY]: () => this.createHealthBar({ text: KeyMonster.CARNODUSK, x: 0, y: 0, enemy: true })
    };
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
    this.leftCap = this.sceneUtil.getDynamicImage({
      scene: this.scene, x, y, key: KeyHealthBar.LEFT_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.middleCap = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.leftCap.x + this.leftCap.width,
      y,
      key: KeyHealthBar.MIDDLE_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.rightCap = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.middleCap.x + this.middleCap.displayWidth,
      y,
      key: KeyHealthBar.RIGHT_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    return this.scene.add.container(x, y, [
      this.leftCap,
      this.middleCap,
      this.rightCap
    ]);
  }
}
