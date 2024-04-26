import { CANVAS, Scale, Types } from "phaser";

import { SCENES } from "../scenes";

export const GameConfig: Types.Core.GameConfig = {
  type: CANVAS,
  pixelArt: false,
  scale: {
    parent: 'game-container',
    width: 1024,
    height: 576,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH
  },
  scene: SCENES
}
