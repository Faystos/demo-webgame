import { Scene } from "phaser";
import { KeyMonster } from "../../keys";

export interface IBattleMonster {
  scene: Scene;
  monsterDetails: IMonsterDetails;
  position?: {
    x: number;
    y: number;
  }
}

export interface IMonsterDetails {
  name: KeyMonster;
  assetKey: KeyMonster;
  assetFrame?: number;
  maxHP: number;
  currentHP: number;
  baseAttack: number;
  attackIds: string[];
  isEnemy: boolean;
  flip?: boolean;
}
