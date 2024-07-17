import { Scene } from "phaser";
import { KeyMonster } from "../../keys";

export interface IBattleMonster {
  scene: Scene;
  monsterDetails: IMonsterDetails;
  position: {
    x: number;
    y: number;
  }
}

export interface IPlayerBattleMonster {
  scene: Scene;
  monsterDetails: IPlayerMonsterDetails;
}

export interface IEnemyBattleMonster extends IPlayerBattleMonster {
  monsterDetails: IEnemyMonsterDetails
}

export interface IMonsterDetails extends IPlayerMonsterDetails {
  isEnemy: boolean;
  flip: boolean;
}

interface IPlayerMonsterDetails {
  name: KeyMonster;
  assetKey: KeyMonster;
  assetFrame?: number;
  maxHP: number;
  currentHP: number;
  currentLevel: number;
  baseAttack: number;
  attackIds: string[];
}

interface IEnemyMonsterDetails extends IPlayerMonsterDetails {}
