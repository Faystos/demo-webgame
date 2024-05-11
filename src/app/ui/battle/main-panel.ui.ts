import {
  Scene,
  GameObjects
} from "phaser";

import {
  KeyBattleMenu,
  KeyMonster
} from "../../keys";
import { Direction } from "../../types";

export class MainPanelUi {
  private scene!: Scene;

  private mainInfoPanelGameObject!: GameObjects.Rectangle;
  private mainBattleMenuGameObject!: GameObjects.Container;
  private attackMenuGameObject!: GameObjects.Container;

  private battleTextGameObjectLine1!: GameObjects.Text;
  private battleTextGameObjectLine2!: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
    this.renderInfoPanel();
  }

  isShowMainInfoPanel(state: 0 | 1) {
    this.mainInfoPanelGameObject.setAlpha(state);
  }

  isShowMainBattleMenu(state: 0 | 1) {

    this.mainBattleMenuGameObject.setAlpha(state);
  }

  isShowAttackMenu(state: 0 | 1) {
    this.attackMenuGameObject.setAlpha(state);
  }

  isShowBattleText(state: 0 | 1) {
    this.battleTextGameObjectLine1.setAlpha(state);
    this.battleTextGameObjectLine2.setAlpha(state);
  }

  handlePlayerInput(input: 'OK' | 'CANSEL') {
    if (input === 'OK') {
      this.isShowMainBattleMenu(1);
      this.isShowBattleText(0);
      this.isShowAttackMenu(0);
      return;
    }
    if (input === 'CANSEL') {
      this.isShowMainBattleMenu(0);
      this.isShowBattleText(1);
      this.isShowAttackMenu(1);
    }
  }

  handleInputDirection(direction: Direction) {
    console.log('direction: ', direction);
  }

  private renderInfoPanel() {
    this.createMainInfoPanel();
    this.createMainBattleMenu();
    this.createAttackMenu();

    this.isShowMainInfoPanel(1);
    this.isShowMainBattleMenu(0);
    this.isShowAttackMenu(1);
  }

  private createMainInfoPanel() {
    const padding = 4;
    const rectHeight = 124;

    this.mainInfoPanelGameObject = this.scene.add.rectangle(
      padding,
      this.scene.scale.height - rectHeight - padding,
      this.scene.scale.width - (padding * 2),
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
    return  this.scene.add.rectangle(
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

  private createMainBattleMenu() {
    this.battleTextGameObjectLine1 = this.scene.add.text(20, 468, 'what should', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }));
    this.battleTextGameObjectLine2 = this.scene.add.text(20, 512, `${KeyMonster.IGUANIGNITE} do next`, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }));

    this.mainBattleMenuGameObject = this.scene.add.container(0, 448, [
      this.scene.add.text(55,22, 'slash', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,22, 'growl', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(55,70, '-', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,70, '-', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
    ]);

    this.isShowMainBattleMenu(0);
  }

  private createAttackMenu() {
    this.attackMenuGameObject = this.scene.add.container(520, 448, [
      this.createSubInfoPanel(),
      this.scene.add.text(55,22, KeyBattleMenu.FIGHT, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,22, KeyBattleMenu.SWITCH, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(55,70, KeyBattleMenu.ITEM, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,70, KeyBattleMenu.FLEE, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }))
    ]);

    this.isShowAttackMenu(0);
  }

  private getOptionTextSubPanel(option: { color: string;  fontSize: string}) {
    const { color, fontSize} = option;
    return {
      color,
      fontSize
    }
  }
}
