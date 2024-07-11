import {
  Scene,
  GameObjects
} from "phaser";

import {
  IBattleMonster, IImage,
  IMonsterDetails
} from "../../../types";
import { SceneUtil } from "../../../services";
import {
  KeyMonster,
  KeyPerson
} from "../../../keys";
import { HealthBarUi } from "../../../ui/battle";

export class BattleMonster {
  protected _scene!: Scene;
  protected _monsterDetails!: IMonsterDetails;
  protected _monster!: GameObjects.Image;

  protected _currentHP!: number;
  protected _maxHP!: number;
  protected _monsterAttack!: number[];

  private readonly sceneUtil = SceneUtil;
  private uiHealthBar!: HealthBarUi;

  get isFainted(): boolean {
    return this._currentHP <= 0;
  }

  get name(): string {
    return this._monsterDetails.name;
  }

  get attacks(): number[] {
    return [...this._monsterAttack];
  }

  get baseAttack(): number {
    return this._monsterDetails.baseAttack;
  }

  constructor(config: IBattleMonster) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;

    this._currentHP = this._monsterDetails.currentHP;
    this._maxHP = this._monsterDetails.maxHP;
    this._monsterAttack = [];

    this.uiHealthBar = new HealthBarUi(this._scene);
    this.renderHealthBar(this._monsterDetails.isEnemy, this._monsterDetails.name);

    this.createMonster({
      scene: this._scene,
      x: config.position!.x as number,
      y: config.position!.y as number,
      assetKey: this._monsterDetails.assetKey,
      flip: this._monsterDetails.flip
    });
  }

  public takeDamage(damage: number, callback?: () => void): void {
    this._currentHP -= damage;
    if (this._currentHP < 0) this._currentHP = 0;
    this.uiHealthBar.setMeterPercentageAnimated(this._currentHP / this._maxHP, { callback });
  }

  private createMonster(obfMonster: IImage): void {
    const { scene, x, y, assetKey, flip } = obfMonster;
    this._monster = this.sceneUtil.getDynamicImage({ scene, x, y, assetKey, flip });
  }

  private renderHealthBar(isEnemy: boolean, name: KeyMonster): void {
    const person: KeyPerson = isEnemy ? KeyPerson.ENEMY : KeyPerson.PLAYER;
    this.uiHealthBar.renderHealthBar(person, isEnemy, name);
  }
}
