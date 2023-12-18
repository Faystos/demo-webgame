import { Component } from '@angular/core';
import { AUTO, Game, Scene, Types } from 'phaser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Scene{
  phaserGame!: Phaser.Game;
  config: Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    scene: [this]
  };

  constructor() {
    super('Game');
    this.phaserGame = new Game(this.config);
  }

  preload() {}

  create(){}

  override update() {}

}
