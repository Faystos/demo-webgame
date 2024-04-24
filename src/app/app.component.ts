import {Component, OnInit} from '@angular/core';

import { AUTO, Game, Scene, Types } from 'phaser';

import { EScene } from "./types/scene";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Scene implements OnInit{
  phaserGame!: Phaser.Game;
  config: Types.Core.GameConfig = {
    parent: 'game-container',
    type: AUTO,
    width: 800,
    height: 600,
    scene: [this]
  };

  constructor() {
    super(EScene.GAME);
  }

  ngOnInit() {
    this.phaserGame = new Game({ parent: 'game-container' });
  }

  preload() {}

  create(){}

  override update() {}

}
