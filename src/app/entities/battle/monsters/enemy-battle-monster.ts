import { BattleMonster } from "./battle-moster";
import { IEnemyBattleMonster } from "../../../types/battle/battle-monster.type";

const position = Object.freeze({
  x: 768,
  y: 144
});

export class EnemyBattleMonster extends  BattleMonster {
  private static readonly isEnemy = true;

  constructor(config: IEnemyBattleMonster) {
    super({
      scene: config.scene,
      monsterDetails: {
        ...config.monsterDetails,
        flip: false,
        isEnemy: EnemyBattleMonster.isEnemy
      },
      position
    })
  }
}
