import { Scene } from "phaser";

export interface IImage {
  scene: Scene;
  x: number;
  y:number;
  assetKey: string;
  flip?: boolean
}
