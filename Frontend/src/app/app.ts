import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MidiEditor} from './midi-editor/midi-editor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MidiEditor],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'Frontend';
}
