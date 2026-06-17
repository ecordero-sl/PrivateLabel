import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { IPrivateLabel } from '../constants';

@Component({
  selector: 'app-preview-controls',
  imports: [],
  templateUrl: './preview-controls.html',
  styleUrl: './preview-controls.css',
})
export class PreviewControls {
  privateLabels = input<IPrivateLabel[]>([]);

  selectedManagerId = output<string>();

  newManagerId = model<string>('');
  managerId = computed(() => this.newManagerId());
  selectedPrivateLabelName = computed(
    () => this.privateLabels().find(pl => pl.managerId === this.managerId())?.name ?? ''
  );

  constructor() {
    effect(() => {
      this.selectedManagerId.emit(this.managerId());
    });

    effect(() => {
      const privateLabels = this.privateLabels();
      const currentManagerId = this.newManagerId();

      if (privateLabels.length === 0) {
        return;
      }

      const hasCurrentSelection = privateLabels.some(pl => pl.managerId === currentManagerId);

      if (!hasCurrentSelection) {
        this.newManagerId.set(privateLabels[0].managerId);
      }
    });
  }

  onClick(event: any): void {
    this.newManagerId.set(event.target.value);
  }
}
