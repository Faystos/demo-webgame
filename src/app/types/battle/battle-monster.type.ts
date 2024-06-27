import { Scene } from "phaser";

export interface IBattleMonster {
  scene: Scene;
  monsterDetails: IMonsterDetails;
  position: {
    x: number;
    y: number;
  }
}

export interface IMonsterDetails {
  name: string;
  assetKey: string;
  assetFrame?: number;
  maxHP: number;
  currentHP: number;
  baseAttack: number;
  attackIds: string[];
  isEnemy: boolean;
  flip?: boolean;
}
