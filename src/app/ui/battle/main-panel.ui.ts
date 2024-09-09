import {
  GameObjects,
  Scene
} from "phaser";

import {
  KeyActiveBattleMenu,
  KeyAttackOption,
  KeyBattleMenu,
  KeyCursor,
  KeyMonster
} from "../../keys";
import { Direction } from "../../types";
import { BattleMonster } from "../../entities/battle";

export class MainPanelUi {
  private scene!: Scene;
  private activeBattleMonster!: BattleMonster;

  private attackMenuGameObject!: GameObjects.Container;
  private battleTextGameObjectLine1!: GameObjects.Text;
  private battleTextGameObjectLine2!: GameObjects.Text;
  private mainInfoPanelGameObject!: GameObjects.Rectangle;
  private mainBattleMenuGameObject!: GameObjects.Container;
  private mainBattleMenuCursorGameObject!: GameObjects.Image;
  private attackBattleMenuCursorGameObject!: GameObjects.Image;

  private selectedBattleMenuOption = KeyBattleMenu.FIGHT;
  private selectedAttackOption = KeyAttackOption.MOVE_1;

  private activeBattleMenu = KeyActiveBattleMenu.BATTLE_MAIN;

  private queuedInfoPanelMessages: string[] = [];
  private queuedInfoPanelCallBack: (() => void) | undefined = undefined;
  private waitingForPlayerInput = false;

  private isPlayerAttack$ = false;

  set isPlayerAttack(value: boolean) {
    this.isPlayerAttack$ = value;
  }

  get isPlayerAttack(): boolean {
    return this.isPlayerAttack$;
  }

  constructor(scene: Scene, activeBattleMonster: BattleMonster) {
    this.scene = scene;
    this.activeBattleMonster = activeBattleMonster;
    this.renderInfoPanel();
  }

  isShowMainInfoPanel(state: 0 | 1) {
    this.mainInfoPanelGameObject.setAlpha(state);
  }

   isShowAttackMenu(state: 0 | 1) {
     if(state) this.activeBattleMenu = KeyActiveBattleMenu.BATTLE_MOVE_SELECT;
     this.attackMenuGameObject.setAlpha(state);
  }

  isShowMainBattleMenu(state: 0 | 1) {
    if(state) this.activeBattleMenu = KeyActiveBattleMenu.BATTLE_MAIN;
    this.mainBattleMenuGameObject.setAlpha(state);
  }

  isShowBattleText(state: 0 | 1) {
    this.battleTextGameObjectLine1.setText('what should').setAlpha(state);
    this.battleTextGameObjectLine2.setText(`${this.activeBattleMonster.name} do next`).setAlpha(state);
  }

  handlePlayerInput(input: 'OK' | 'CANSEL') {
    if (this.waitingForPlayerInput && (input === 'CANSEL' || input === 'OK')) {
      this.updateInfoPanelWaitMessage();
      return;
    }

    if (input === 'OK') {
      this.switchToBattleMeinMenu();
      return;
    }
    if (input === 'CANSEL') {
      this.goToMainMenu();
      return;
    }
  }

  handleInputDirection(direction: Direction) {
    this.initBattleMenuOption(direction);
    this.initAttackOption(direction);
  }

  updateInfoPanelMessagesAndWaitForInput(messages: string[], callBack?: ()=> void) {
    this.queuedInfoPanelMessages = messages;
    this.queuedInfoPanelCallBack = callBack;

    this.updateInfoPanelWaitMessage();
  }

  private updateInfoPanelWaitMessage() {
    this.waitingForPlayerInput = false;
    this.battleTextGameObjectLine1.setText(this.queuedInfoPanelMessages).setAlpha(1);

    if (!this.queuedInfoPanelMessages.length) {
      if (this.queuedInfoPanelCallBack !== undefined) {
        this.queuedInfoPanelCallBack();
        this.queuedInfoPanelCallBack = undefined;
      }
      return;
    }

    const messageToDisplay = this.queuedInfoPanelMessages.shift();
    this.battleTextGameObjectLine1.setText(messageToDisplay as string);
    this.waitingForPlayerInput = true;
  }

  private initBattleMenuOption(direction: Direction) {
    if (this.activeBattleMenu === KeyActiveBattleMenu.BATTLE_MAIN) {
      this.handleInputBattleMenuOption(direction);
      this.moveMainBattleMenuCursor();
    }
  }

  private initAttackOption(direction: Direction) {
    if (this.activeBattleMenu === KeyActiveBattleMenu.BATTLE_MOVE_SELECT) {
      this.handleInputAttackOption(direction);
      this.moveAttackOptionCursor();
    }
  }

  private handleInputAttackOption(direction: Direction) {
    switch (this.selectedAttackOption) {
      case KeyAttackOption.MOVE_1:
        if(direction !== Direction.RIGHT && direction !== Direction.DOWN) return;
        if(direction === Direction.RIGHT) {
          this.selectedAttackOption = KeyAttackOption.MOVE_2;
        } else if (direction === Direction.DOWN) {
          this.selectedAttackOption = KeyAttackOption.MOVE_3;
        }
        return;
      case KeyAttackOption.MOVE_2:
        if(direction !== Direction.LEFT && direction !== Direction.DOWN) return;
        if(direction === Direction.LEFT) {
          this.selectedAttackOption = KeyAttackOption.MOVE_1;
        } else if (direction === Direction.DOWN) {
          this.selectedAttackOption = KeyAttackOption.MOVE_4;
        }
        return;
      case KeyAttackOption.MOVE_3:
        if(direction !== Direction.RIGHT && direction !== Direction.UP) return;
        if(direction === Direction.RIGHT) {
          this.selectedAttackOption = KeyAttackOption.MOVE_4;
        } else if (direction === Direction.UP) {
          this.selectedAttackOption = KeyAttackOption.MOVE_1;
        }
        return;
      case KeyAttackOption.MOVE_4:
        if(direction !== Direction.LEFT && direction !== Direction.UP) return;
        if(direction === Direction.LEFT) {
          this.selectedAttackOption = KeyAttackOption.MOVE_3;
        } else if (direction === Direction.UP) {
          this.selectedAttackOption = KeyAttackOption.MOVE_2;
        }
        return;
      default: return;
    }
  }

  private  handleInputBattleMenuOption(direction: Direction) {
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

  private moveMainBattleMenuCursor() {
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

  private moveAttackOptionCursor() {
    switch (this.selectedAttackOption) {
      case KeyAttackOption.MOVE_1:
        this.attackBattleMenuCursorGameObject.setPosition(42, 38);
        return;
      case KeyAttackOption.MOVE_2:
        this.attackBattleMenuCursorGameObject.setPosition(228, 38);
        return;
      case KeyAttackOption.MOVE_3:
        this.attackBattleMenuCursorGameObject.setPosition(42, 86);
        return;
      case KeyAttackOption.MOVE_4:
        this.attackBattleMenuCursorGameObject.setPosition(228, 86);
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
    this.isShowMainBattleMenu(1);
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

  private createAttackMenu() {
    this.battleTextGameObjectLine1 = this.scene.add.text(20, 468, 'what should', this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }));
    this.battleTextGameObjectLine2 = this.scene.add.text(20, 512, `${KeyMonster.IGUANIGNITE} do next`, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' }));

    const attackNames = this.createAttackNames();

    this.attackMenuGameObject= this.scene.add.container(0, 448, [
      this.scene.add.text(55,22, attackNames[0], this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,22, attackNames[1], this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(55,70, attackNames[2], this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,70, attackNames[3], this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.attackBattleMenuCursorGameObject
    ]);

    this.isShowAttackMenu(0);
  }

  private createMainBattleMenu() {
    this.mainBattleMenuGameObject   = this.scene.add.container(520, 448, [
      this.createSubInfoPanel(),
      this.scene.add.text(55,22, KeyBattleMenu.FIGHT, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,22, KeyBattleMenu.SWITCH, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(55,70, KeyBattleMenu.ITEM, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.scene.add.text(240,70, KeyBattleMenu.FLEE, this.getOptionTextSubPanel({ color: '#000000', fontSize: '30px' })),
      this.mainBattleMenuCursorGameObject,
    ]);

    this.isShowMainBattleMenu(0);
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

  //Переходы на главном меню
  public goToMainMenu() {
    this.isShowAttackMenu(0);
    this.isShowMainBattleMenu(1);
    this.isShowBattleText(1);
  }

  private goToAttackMenu() {
    this.isShowAttackMenu(1);
    this.isShowBattleText(0);
    this.isShowMainBattleMenu(0);
  }

  private goToSwitchMenu() {
    this.toggleMainBattleMenu(['You have no other monsters in your party...']);
  }

  private goToFleeMenu() {
    this.toggleMainBattleMenu(['You fail to run away...']);
  }

  private goToItemMenu() {
    this.toggleMainBattleMenu(['Your bag is empty...']);
  }

  private toggleMainBattleMenu(message: string[]) {
    this.isShowBattleText(0);
    this.isShowMainBattleMenu(0);

    this.updateInfoPanelMessagesAndWaitForInput(message, () => {
      this.goToMainMenu();
    });

    return;
  }

  private toggleAttackMenu(message?: string[], callback?: () => void) {
    this.isShowBattleText(0);
    this.isShowAttackMenu(0);
    this.isPlayerAttack$ = true;

    if (callback) callback();
  }

  private switchToMainMenu(): void {
    this.createBattleMenuObject()[this.selectedBattleMenuOption]();
  }

  private switchToBattleMeinMenu() {
    this.createActiveBattleObject()[this.activeBattleMenu]();
  }

  private switchToAttackMenu() {
    this.creatActiveAttackObject()[this.selectedAttackOption]();
  }

  private createBattleMenuObject() {
    return {
      [KeyBattleMenu.FIGHT]:  () =>this.goToAttackMenu(),
      [KeyBattleMenu.SWITCH]: () => this.goToSwitchMenu(),
      [KeyBattleMenu.FLEE]:   () => this.goToFleeMenu(),
      [KeyBattleMenu.ITEM]:   () => this.goToItemMenu()
    }
  }

  private createActiveBattleObject() {
    return {
      [KeyActiveBattleMenu.BATTLE_MAIN]:        () => this.switchToMainMenu(),
      [KeyActiveBattleMenu.BATTLE_ITEM]:        () => console.log('BATTLE_ITEM'),
      [KeyActiveBattleMenu.BATTLE_SWITCH]:      () => console.log('BATTLE_SWITCH'),
      [KeyActiveBattleMenu.BATTLE_FLEE]:        () => console.log('BATTLE_FLEE'),
      [KeyActiveBattleMenu.BATTLE_MOVE_SELECT]: () => this.switchToAttackMenu(),
    }
  }

  private creatActiveAttackObject() {
    return {
      [KeyAttackOption.MOVE_1]: () => this.toggleAttackMenu(),
      [KeyAttackOption.MOVE_2]: () => this.toggleAttackMenu(),
      [KeyAttackOption.MOVE_3]: () => this.toggleAttackMenu(),
      [KeyAttackOption.MOVE_4]: () => this.toggleAttackMenu(),
    }
  }

  private createAttackNames(): string[] {
    const attackNames: string[] = [];
    for (let i = 0; i < 4; i++) {
      attackNames.push(this.activeBattleMonster.attacks[i]?.name || '-');
    }
    return attackNames;
  }
}
