import { Component, OnInit } from '@angular/core';

import {
  Game,
  Types,
  CANVAS,
  Scale
} from 'phaser';

import {
  GameScene,
  PreloadScene
} from "./scenes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  phaserGame!: Phaser.Game;
  config: Types.Core.GameConfig = {
    type: CANVAS,
    pixelArt: false,
    scale: {
      parent: 'game-container',
      width: 1024,
      height: 576,
      mode: Scale.FIT,
      autoCenter: Scale.CENTER_BOTH
    },
    scene: [
      PreloadScene,
      GameScene
    ]
  };

  ngOnInit() {
    this.phaserGame = new Game(this.config);
  }
}
