import { Scene, GameObjects } from "phaser";

import {
  KeyBattleMenu,
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
    this.renderInfoPanel();
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

  private renderInfoPanel() {
    this.createMainInfoPanel();
    this.add.container(520, 448, [
      this.createSubInfoPanel(),
      this.add.text(55,22, KeyBattleMenu.FIGHT, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(240,22, KeyBattleMenu.SWITCH, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(55,70, KeyBattleMenu.ITEM, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(240,70, KeyBattleMenu.FLEE, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }))
    ]);

    this.add.container(0, 448, [
      this.add.text(55,22, 'slash', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(240,22, 'growl', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(55,70, '-', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.add.text(240,70, '-', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
    ])
  }

  private createMainInfoPanel() {
    const padding = 4;
    const rectHeight = 124;
    this.add.rectangle(
      padding,
      this.scale.height - rectHeight - padding,
        this.scale.width - (padding * 2),
        rectHeight,
      0xede4f3,
      1
    )
      .setOrigin(0)
      .setStrokeStyle(8, 0xe4434a, 1);
  }

  private createSubInfoPanel() {
    const rectWight = 500;
    const rectHeight = 124;
    return  this.add.rectangle(
      0,
      0,
      rectWight,
      rectHeight,
      0xede4f3,
      1
    )
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }

  private getOptionTextSubPanel(option: { color: string;  fontSize: string}) {
    const { color, fontSize} = option;
    return {
      color,
      fontSize
    }
  }
}
