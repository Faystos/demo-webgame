import {
  Input,
  Scene,
  Types
} from "phaser";

import {
  KeyImage,
  KeyMonster,
  KeyScene
} from "../keys";
import { Direction } from "../types";

import { MainPanelUi } from "../ui/battle";
import { SceneUtil } from "../services";
import {
  EnemyBattleMonster,
  PlayerBattleMonster,
} from "../entities/battle";

export class BattleScene extends Scene {
  private readonly sceneUtil = SceneUtil;
  private uiMainPanel!: MainPanelUi;
  private cursorKeys!: Types.Input.Keyboard.CursorKeys;
  private playerBattleMonster!: PlayerBattleMonster;
  private activePlayerAttackIndex: number = -1;
  private enemyBattleMonster!: EnemyBattleMonster;

  constructor() {
    super(KeyScene.BATTLE);
  }

  create() {
    this.renderBackground();
    this.renderMonsters();
    this.renderPanel();
    this.createCursorKeys();
  }

  override update() {
    this.handlePlayerInput();
    this.handleInputDirection();
  }

  private renderBackground() {
    this.sceneUtil.addBackground(this, KeyImage.BG_FOREST);
  }

  private renderMonsters() {
    this.createPlayerMonster();
    this.createEnemyMonster();
  }

  private renderPanel() {
    this.uiMainPanel = new MainPanelUi(this, this.playerBattleMonster);
  }

  private createCursorKeys() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  private handlePlayerInput() {
    const wasSpaceKeyPassed = Input.Keyboard.JustDown(this.cursorKeys.space);
    const wasShiftKeyPassed = Input.Keyboard.JustDown(this.cursorKeys.shift);

    if (wasSpaceKeyPassed) {
      this.uiMainPanel.handlePlayerInput('OK');
      this.activePlayerAttackIndex = this.uiMainPanel.selectedAttack;
      this.handleBattleSequence()
      return;
    }

    if(wasShiftKeyPassed) {
      this.uiMainPanel.handlePlayerInput('CANSEL');
      return;
    }
  }

  private handleInputDirection() {
    let selectedDirection: Direction = Direction.NONE;

    if(this.cursorKeys.down.isDown) {
      selectedDirection = Direction.DOWN;
    } else if(this.cursorKeys.up.isDown) {
      selectedDirection = Direction.UP;
    } else if(this.cursorKeys.left.isDown) {
      selectedDirection = Direction.LEFT;
    } else if(this.cursorKeys.right.isDown) {
      selectedDirection = Direction.RIGHT;
    }

    if (selectedDirection !== Direction.NONE) {
      this.uiMainPanel.handleInputDirection(selectedDirection);
    }
  }

  private handleBattleSequence() {
    if (this.uiMainPanel.isPlayerAttack) this.playerAttack();

  }

  private playerAttack() {
    this.uiMainPanel.updateInfoPanelMessagesAndWaitForInput([`${this.playerBattleMonster.name} used ${this.playerBattleMonster.attacks[this.activePlayerAttackIndex].name}`], () => {
      this.uiMainPanel.isPlayerAttack = false;
      this.time.delayedCall(500, ()=> {
        this.enemyBattleMonster.takeDamage(5, () => {
          this.enemyAttack();
        });
      })
    });
  }

  private enemyAttack() {
    this.uiMainPanel.updateInfoPanelMessagesAndWaitForInput([`for ${this.enemyBattleMonster.name} used ${this.enemyBattleMonster.attacks[0].name}`], () => {
      this.time.delayedCall(10, ()=> {
        this.playerBattleMonster.takeDamage(5, () => {
          this.uiMainPanel.goToMainMenu();
        })
      })
    });
  }

  private createPlayerMonster() {
    this.playerBattleMonster = new PlayerBattleMonster({
      scene: this,
      monsterDetails: {
        name: KeyMonster.IGUANIGNITE,
        assetKey: KeyMonster.IGUANIGNITE,
        assetFrame: 0,
        currentHP: 25,
        currentLevel: 1,
        maxHP: 25,
        baseAttack: 5,
        attackIds: [2, 1]
      }
    });
  }

  private createEnemyMonster() {
    this.enemyBattleMonster = new EnemyBattleMonster(
      {
        scene: this,
        monsterDetails: {
          name: KeyMonster.CARNODUSK,
          assetKey: KeyMonster.CARNODUSK,
          assetFrame: 0,
          currentHP: 25,
          currentLevel: 1,
          maxHP: 25,
          baseAttack: 5,
          attackIds: [1]
        }
      }
    );
  }
}
