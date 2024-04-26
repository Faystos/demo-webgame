import { Component, OnInit } from '@angular/core';

import { Game } from 'phaser';

import { GameConfig } from "./configs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    new Game(GameConfig);
  }
}
