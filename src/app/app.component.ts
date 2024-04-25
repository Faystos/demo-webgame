import { Component, OnInit } from '@angular/core';

import {
  AUTO,
  Game,
  Types
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
    parent: 'game-container',
    type: AUTO,
    // width: 800,
    // height: 600,
    scene: [
      PreloadScene,
      GameScene
    ]
  };

  ngOnInit() {
    this.phaserGame = new Game(this.config);
  }
}
