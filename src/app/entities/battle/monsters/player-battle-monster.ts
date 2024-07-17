import { BattleMonster } from "./battle-moster";
import { IPlayerBattleMonster } from "../../../types/battle/battle-monster.type";

const position = Object.freeze({
  x: 256,
  y: 316
});

export class PlayerBattleMonster extends  BattleMonster {
  private static readonly isEnemy = false;
  private static readonly flip = true;

  constructor(config: IPlayerBattleMonster) {
    super({
      scene: config.scene,
      monsterDetails: {
        ...config.monsterDetails,
        isEnemy: PlayerBattleMonster.isEnemy,
        flip: PlayerBattleMonster.flip
      },
      position
    });
  }
}
