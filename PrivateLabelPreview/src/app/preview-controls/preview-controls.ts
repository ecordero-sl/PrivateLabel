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
  selectedConfig = computed(
    () => {
      const config = this.privateLabels().find(pl => pl.managerId === this.newManagerId())
      if (!config) return ''
      const result = 
`{
  name: ${config.name},
  managerId: ${config.managerId},
  email: {
    logoFile: ${config.email.logoFile},
    backgroundColor: ${config.email.backgroundColor},
    color: ${config.email.color},
  }
}`
      return result
    }
  );

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
