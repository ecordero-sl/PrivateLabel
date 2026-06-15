import { Component, computed, effect, input, model, output } from '@angular/core';
import { IPrivateLabel } from '../constants';

@Component({
  selector: 'app-preview-controls',
  imports: [],
  templateUrl: './preview-controls.html',
  styleUrl: './preview-controls.css',
})
export class PreviewControls {
  privateLabels = input<IPrivateLabel[]>([])
  placeholderManagerId = input<string>()
  
  selectedManagerId = output<string>()

  newManagerId = model<string>(this.placeholderManagerId() ?? '')
  managerId = computed(() => this.newManagerId())

  constructor() {
    effect(() => {
      this.selectedManagerId.emit(this.managerId())
    })
  }

  ngOnInit() {
    this.newManagerId.set(this.placeholderManagerId() ?? '')
  }

  onClick(event: any): void {
    this.newManagerId.set(event.target.value);
  }
}
