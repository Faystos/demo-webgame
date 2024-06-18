import {
  Input,
  Scene,
  Types
} from "phaser";

import {
  KeyImage,
  KeyMonster,
  KeyPerson,
  KeyScene
} from "../keys";
import {
  Direction,
  IImage
} from "../types";

import {
  HealthBarUi,
  MainPanelUi
} from "../ui/battle";
import { SceneUtil } from "../services";

export class BattleScene extends Scene {
  private readonly sceneUtil = SceneUtil;
  private uiMainPanel!: MainPanelUi;
  private uiHealthBarPlayer: HealthBarUi = new HealthBarUi(this);
  private uiHealthBarEnemy: HealthBarUi= new HealthBarUi(this);
  private cursorKeys!: Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(KeyScene.BATTLE);
  }

  create() {
    this.renderBackground();
    this.renderMonsters();
    this.renderHealthBar();
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
    this.createMonster({ scene: this,  x: 768, y: 144, key: KeyMonster.CARNODUSK, flip: false });
    this.createMonster({ scene: this, x: 256, y: 316, key: KeyMonster.IGUANIGNITE, flip: true });
  }

  private createMonster(obfMonster: IImage) {
    const { scene, x, y, key, flip } = obfMonster;
    this.sceneUtil.addDynamicImage({ scene, x, y, key, flip });
  }

  private renderHealthBar() {
    this.uiHealthBarPlayer.renderHealthBar(KeyPerson.PLAYER);
    this.uiHealthBarEnemy.renderHealthBar(KeyPerson.ENEMY)
  }

  private renderPanel() {
    this.uiMainPanel = new MainPanelUi(this);
  }

  private createCursorKeys() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  private handlePlayerInput() {
    const wasSpaceKeyPassed = Input.Keyboard.JustDown(this.cursorKeys.space);
    const wasShiftKeyPassed = Input.Keyboard.JustDown(this.cursorKeys.shift);

    if (wasSpaceKeyPassed) {
      this.uiMainPanel.handlePlayerInput('OK');
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
}
