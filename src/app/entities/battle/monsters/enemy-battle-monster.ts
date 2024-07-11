import { BattleMonster } from "./battle-moster";
import { IBattleMonster } from "../../../types";

export class EnemyBattleMonster extends  BattleMonster{
  constructor(config: IBattleMonster) {
    super({ scene: config.scene, monsterDetails: config.monsterDetails, position: { x: 768, y: 144 } })
  }
}
