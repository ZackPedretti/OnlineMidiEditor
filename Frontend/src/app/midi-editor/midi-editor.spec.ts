import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiEditor } from './midi-editor';

describe('MidiEditor', () => {
  let component: MidiEditor;
  let fixture: ComponentFixture<MidiEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidiEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidiEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
