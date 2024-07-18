import {
  GameObjects,
  Scene
} from "phaser";

import { SceneUtil } from "../../services";

import {
  KeyHealthBar,
  KeyImage,
  KeyPerson
} from "../../keys";
import { IMonsterDetails } from "../../types";

export class HealthBarUi {
  private readonly scene!: Scene;
  private readonly sceneUtil = SceneUtil;

  private fullWidth = 360;
  private scaleY = 0.7;

  private leftCap!: GameObjects.Image;
  private middleCap!: GameObjects.Image;
  private rightCap!: GameObjects.Image;

  private leftCapShadow!: GameObjects.Image;
  private middleCapShadow!: GameObjects.Image;
  private rightCapShadow!: GameObjects.Image;

  private healthPointLevel!: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public renderHealthBar(person: KeyPerson, config: IMonsterDetails) {
    this.getPersonHealthBar(config)[person]();
    this.setMeterPercentage(1);
  }

  public setMeterPercentageAnimated(percent: number, options?: any) {
    const width = this.fullWidth * percent;
    this.addAnimatedHealthBar(width, options);
  }

  public setHealthBarText(text: string) {
    this.healthPointLevel.setText(text);
  }

  private setMeterPercentage(percent = 1) {
    this.middleCap.displayWidth = this.fullWidth * percent;
    this.rightCap.x = this.middleCap.x + this.middleCap.displayWidth;
  }

  private getPersonHealthBar(config: IMonsterDetails): { [key in KeyPerson]: ()=> void } {
    const position = {
      x: !config.isEnemy ? 556 : 0,
      y: !config.isEnemy ? 318 : 0
    }
    return {
      [KeyPerson.PLAYER]: () => this.createHealthBar({ text: config.name, x: position.x, y: position.y, config }),
      [KeyPerson.ENEMY]: () => this.createHealthBar({ text: config.name, x: position.x, y: position.y, config })
    };
  }

  private createHealthBar(objHealthBar: { text: string, x: number, y: number, config: IMonsterDetails }) {
    const { text, x, y , config } = objHealthBar;

    // texts container
    const monsterName = this.scene.add.text(
      30,
      20,
      text,
      { color: '#7E3D3F', fontSize: '32px' }
    );

    const monsterLevel = this.scene.add.text(
      monsterName.width + 35,
      23,
      `L${ config.currentLevel }`,
      { color: '#ED474B', fontSize: '28px' }
    );

    const healthPointText = this.scene.add.text(
      30,
      55,
      'HP',
      { color: '#FF6505', fontSize: '24px', fontStyle: 'italic' }
    );

    this.healthPointLevel =  this.scene.add.text(
      443,
      80,
      `${ config.currentHP }/${ config.maxHP }`,
      { color: '#7E3D3F', fontSize: '16px' }
    ).setOrigin(1, 0);

    // container children
    const textList = config.isEnemy ?
      [
        monsterName,
        monsterLevel,
        healthPointText,
        // this.healthPointLevel,
      ] :
      [
        monsterName,
        monsterLevel,
        healthPointText,
        this.healthPointLevel,
      ];
    // background image
    const bgHealthBar = config.isEnemy ? this.sceneUtil.getStaticImage({ scene: this.scene, x: 0, y:0, assetKey: KeyImage.BG_HEALTH_BAR}).setScale(1, .8) :
      this.sceneUtil.getStaticImage({ scene: this.scene, x: 0, y:0, assetKey: KeyImage.BG_HEALTH_BAR})//.setScale(1, .8);

    const containerChildren: GameObjects.GameObject[] = [
      bgHealthBar,
      this.createHealth(34, 34),
      this.createHealthShadow(34, 34),
      ...textList
    ];
    // container
    this.scene.add.container(x, y, containerChildren);
  }

  private createHealth(x: number, y: number) {
    this.leftCap = this.sceneUtil.getDynamicImage({
      scene: this.scene, x, y, assetKey: KeyHealthBar.LEFT_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.middleCap = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.leftCap.x + this.leftCap.width,
      y,
      assetKey: KeyHealthBar.MIDDLE_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.rightCap = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.middleCap.x + this.middleCap.displayWidth,
      y,
      assetKey: KeyHealthBar.RIGHT_CAP
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    return this.scene.add.container(x, y, [
      this.leftCap,
      this.middleCap,
      this.rightCap
    ]);
  }

  private createHealthShadow(x: number, y: number) {
    this.leftCapShadow = this.sceneUtil.getDynamicImage({
      scene: this.scene, x, y, assetKey: KeyHealthBar.LEFT_CAP_SHADOW
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.middleCapShadow = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.leftCapShadow.x + this.leftCapShadow.width,
      y,
      assetKey: KeyHealthBar.MIDDLE_CAP_SHADOW
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    this.middleCapShadow.displayWidth = this.fullWidth;

    this.rightCapShadow = this.sceneUtil.getDynamicImage({
      scene: this.scene,
      x: this.middleCapShadow.x + this.middleCapShadow.displayWidth,
      y,
      assetKey: KeyHealthBar.RIGHT_CAP_SHADOW
    }).setOrigin(0, .5)
      .setScale(1, this.scaleY);

    return this.scene.add.container(x, y, [
      this.leftCapShadow,
      this.middleCapShadow,
      this.rightCapShadow
    ]);
  }

  private addAnimatedHealthBar(width: number, options?: { duration?: number, callback?: () => void } ) {
    this.scene.tweens.add({
      targets: this.middleCap,
      displayWidth: width,
      duration: options?.duration || 1000,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.rightCap.x = this.middleCap.x + this.middleCap.displayWidth;
        const isVisible = this.middleCap.displayWidth > 0;
        this.leftCap.visible = isVisible;
        this.middleCap.visible = isVisible;
        this.rightCap.visible = isVisible;
      },
      onComplete: options?.callback
    });
  }
}
