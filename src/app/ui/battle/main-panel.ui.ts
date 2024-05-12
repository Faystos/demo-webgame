import {
  GameObjects,
  Scene
} from "phaser";

import {
  KeyBattleMenu,
  KeyCursor,
  KeyMonster
} from "../../keys";
import {
  Direction
} from "../../types";

export class MainPanelUi {
  private scene!: Scene;

  private attackMenuGameObject!: GameObjects.Container;
  private battleTextGameObjectLine1!: GameObjects.Text;
  private battleTextGameObjectLine2!: GameObjects.Text;
  private mainInfoPanelGameObject!: GameObjects.Rectangle;
  private mainBattleMenuGameObject!: GameObjects.Container;
  private mainBattleMenuCursorGameObject!: GameObjects.Image;
  private attackBattleMenuCursorGameObject!: GameObjects.Image;

  private selectedBattleMenuOption = KeyBattleMenu.FIGHT;

  constructor(scene: Scene) {
    this.scene = scene;
    this.renderInfoPanel();
    this.moveMainBattleMenuCursor();
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
    switch (this.selectedBattleMenuOption) {
      case KeyBattleMenu.FIGHT:
        if(direction !== Direction.RIGHT && direction !== Direction.DOWN) return;
        if(direction === Direction.RIGHT) {
          this.selectedBattleMenuOption = KeyBattleMenu.SWITCH;
        } else if (direction === Direction.DOWN) {
          this.selectedBattleMenuOption = KeyBattleMenu.ITEM;
        }
        return;
      case KeyBattleMenu.SWITCH:
        if(direction !== Direction.LEFT && direction !== Direction.DOWN) return;
        if(direction === Direction.LEFT) {
          this.selectedBattleMenuOption = KeyBattleMenu.FIGHT;
        } else if (direction === Direction.DOWN) {
          this.selectedBattleMenuOption = KeyBattleMenu.FLEE;
        }
        return;
      case KeyBattleMenu.ITEM:
        if(direction !== Direction.RIGHT && direction !== Direction.UP) return;
        if(direction === Direction.RIGHT) {
          this.selectedBattleMenuOption = KeyBattleMenu.FLEE;
        } else if (direction === Direction.UP) {
          this.selectedBattleMenuOption = KeyBattleMenu.FIGHT;
        }
        return;
      case KeyBattleMenu.FLEE:
        if(direction !== Direction.LEFT && direction !== Direction.UP) return;
        if(direction === Direction.LEFT) {
          this.selectedBattleMenuOption = KeyBattleMenu.ITEM;
        } else if (direction === Direction.UP) {
          this.selectedBattleMenuOption = KeyBattleMenu.SWITCH;
        }
        return;
      default: return;
    }
  }

  moveMainBattleMenuCursor() {
    switch (this.selectedBattleMenuOption) {
      case KeyBattleMenu.FIGHT:
        this.mainBattleMenuCursorGameObject.setPosition(42, 38);
        return;
      case KeyBattleMenu.SWITCH:
        this.mainBattleMenuCursorGameObject.setPosition(228, 38);
        return;
      case KeyBattleMenu.ITEM:
        this.mainBattleMenuCursorGameObject.setPosition(42,86);
        return;
      case KeyBattleMenu.FLEE:
        this.mainBattleMenuCursorGameObject.setPosition(228, 86);
        return;
      default: return;
    }
  }

  private renderInfoPanel() {
    this.createMainBattleCursor();
    this.createAttackBattleMenuCursor();
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
      this.attackBattleMenuCursorGameObject
    ]);

    this.isShowMainBattleMenu(0);
  }

  private createAttackMenu() {
    this.attackMenuGameObject = this.scene.add.container(520, 448, [
      this.createSubInfoPanel(),
      this.scene.add.text(55,22, KeyBattleMenu.FIGHT, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,22, KeyBattleMenu.SWITCH, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(55,70, KeyBattleMenu.ITEM, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,70, KeyBattleMenu.FLEE, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.mainBattleMenuCursorGameObject,
    ]);

    this.isShowAttackMenu(0);
  }

  private createMainBattleCursor() {
    this.mainBattleMenuCursorGameObject = this.getMenuCursor();
  }

  private createAttackBattleMenuCursor() {
    this.attackBattleMenuCursorGameObject = this.getMenuCursor();
  }

  private getOptionTextSubPanel(option: { color: string;  fontSize: string}) {
    const { color, fontSize} = option;
    return {
      color,
      fontSize
    }
  }

  private getMenuCursor() {
    return this.scene.add.image(42, 38, KeyCursor.CURSOR, 0).setOrigin(0.5).setScale(2.5);
  }
}
