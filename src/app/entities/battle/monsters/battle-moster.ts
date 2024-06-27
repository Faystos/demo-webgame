import { Scene, GameObjects } from "phaser";

import {
  IBattleMonster, IImage,
  IMonsterDetails
} from "../../../types";
import { SceneUtil } from "../../../services";
import { KeyPerson } from "../../../keys";
import { HealthBarUi } from "../../../ui/battle";

export class BattleMonster {
  protected _scene!: Scene;
  protected _monsterDetails!: IMonsterDetails;
  protected _monster!: GameObjects.Image;

  private readonly sceneUtil = SceneUtil;
  private uiHealthBar!: HealthBarUi;

  constructor(config: IBattleMonster) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;

    this.uiHealthBar = new HealthBarUi(this._scene);
    this.renderHealthBar(this._monsterDetails.isEnemy);

    this.createMonster({
      scene: this._scene,
      x: config.position.x,
      y: config.position.y,
      assetKey: this._monsterDetails.assetKey,
      flip: this._monsterDetails.flip
    });
  }

  public takeDamage(): void {
    this.uiHealthBar.setMeterPercentageAnimated(0.5);
  }

  private createMonster(obfMonster: IImage): void {
    const { scene, x, y, assetKey, flip } = obfMonster;
    this._monster = this.sceneUtil.getDynamicImage({ scene, x, y, assetKey, flip });
  }

  private renderHealthBar(isEnemy: boolean): void {
    const person: KeyPerson = isEnemy ? KeyPerson.ENEMY : KeyPerson.PLAYER;
    this.uiHealthBar.renderHealthBar(person);
  }
}
