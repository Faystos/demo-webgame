import {
  Scene,
  GameObjects
} from "phaser";

import {
  IBattleMonster,
  IImage,
  IMonsterDetails
} from "../../../types";
import { SceneUtil } from "../../../services";
import {
  KeyData,
  KeyPerson
} from "../../../keys";
import { HealthBarUi } from "../../../ui/battle";
import { IBattleMonsterAttack } from "../../../types/battle";


export class BattleMonster {
  protected _scene!: Scene;
  protected _monsterDetails!: IMonsterDetails;
  protected _monster!: GameObjects.Image;

  protected _currentHP!: number;
  protected _maxHP!: number;
  protected _monsterAttack!: IBattleMonsterAttack[];

  private readonly sceneUtil = SceneUtil;
  private uiHealthBar!: HealthBarUi;

  get isFainted(): boolean {
    return this._currentHP <= 0;
  }

  get name(): string {
    return this._monsterDetails.name;
  }

  get attacks(): IBattleMonsterAttack[] {
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
    this.renderHealthBar(this._monsterDetails);

    this.createMonster({
      scene: this._scene,
      x: config.position!.x as number,
      y: config.position!.y as number,
      assetKey: this._monsterDetails.assetKey,
      flip: this._monsterDetails.flip
    });

    const dataMonsterAttack: IBattleMonsterAttack[] = this._scene.cache.json.get(KeyData.ATTACK);
    this._monsterDetails.attackIds.forEach(attackId => {
      const attack = dataMonsterAttack.find(({id}) => attackId === id);
      if (attack) {
        this._monsterAttack.push(attack);
      }
    });
  }

  public takeDamage(damage: number, callback?: () => void): void {
    this._currentHP -= damage;
    if (this._currentHP < 0) this._currentHP = 0;
    this.uiHealthBar.setMeterPercentageAnimated(this._currentHP / this._maxHP, { callback });
    this.uiHealthBar.setHealthBarText(`${ this._currentHP }/${ this._maxHP }`);
  }

  private createMonster(obfMonster: IImage): void {
    const { scene, x, y, assetKey, flip } = obfMonster;
    this._monster = this.sceneUtil.getDynamicImage({ scene, x, y, assetKey, flip });
  }

  private renderHealthBar(config: IMonsterDetails): void {
    const person: KeyPerson = config.isEnemy ? KeyPerson.ENEMY : KeyPerson.PLAYER;
    this.uiHealthBar.renderHealthBar(person, config);
  }
}
