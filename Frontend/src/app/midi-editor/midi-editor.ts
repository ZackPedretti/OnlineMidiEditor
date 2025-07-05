import {Component, ElementRef, ViewChild} from '@angular/core';

enum NoteLabel {
  C="c",
  Cs="cs",
  D="d",
  Ds="ds",
  E="e",
  F="f",
  Fs="fs",
  G="g",
  Gs="gs",
  A="a",
  As="as",
  B="b"
}

type Note = {
  noteLabel: NoteLabel;
  octave: number;
}

type PianoNote = {
  note: Note;
  rect: PianoRect;
}

type PianoRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
}

@Component({
  selector: 'app-midi-editor',
  imports: [],
  templateUrl: './midi-editor.html',
  styleUrl: './midi-editor.sass'
})

export class MidiEditor {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const whiteNotes = [NoteLabel.C, NoteLabel.D, NoteLabel.E, NoteLabel.F, NoteLabel.G, NoteLabel.A, NoteLabel.B].reverse();
    const blackNotes = [NoteLabel.Cs, NoteLabel.Ds, '', NoteLabel.Fs, NoteLabel.Gs, NoteLabel.As, ''];
    const noteSize = 40;
    const noteSectionWidth = 120;
    const octaveRange = 10;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const width = window.innerWidth * 0.9;
    const height = octaveRange*whiteNotes.length*noteSize;

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    let pianoNotes = [] as PianoNote[];

    for (let i = 0; i < octaveRange*whiteNotes.length; i+=whiteNotes.length) {
      for(const [j, value] of whiteNotes.entries()) {
        const pianoNote = {
          note: {
            noteLabel: value,
            octave: octaveRange - (i / whiteNotes.length)
          },
          rect: {
            x: 0,
            y: (i+j)*noteSize,
            width: noteSectionWidth,
            height: noteSize,
            color: value === NoteLabel.C ? '#e3e3e3' : '#ffffff'
          }
        }
        pianoNotes.push(pianoNote);
      }
    }

    function renderPianoNote (pianoNote: PianoNote) {
      if (!ctx) return;
      ctx.strokeStyle = 'black';
      ctx.fillStyle = pianoNote.rect.color;
      ctx.fillRect(pianoNote.rect.x, pianoNote.rect.y, pianoNote.rect.width, pianoNote.rect.height);
      ctx.strokeRect(pianoNote.rect.x, pianoNote.rect.y, pianoNote.rect.width, pianoNote.rect.height);
      if (pianoNote.note.noteLabel === NoteLabel.C) {
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(pianoNote.note.noteLabel.toUpperCase() + pianoNote.note.octave, pianoNote.rect.x + noteSectionWidth / 5, pianoNote.rect.y + pianoNote.rect.height - 16);
      }
    }

    pianoNotes.forEach(pianoNote => renderPianoNote(pianoNote));

  }
}
