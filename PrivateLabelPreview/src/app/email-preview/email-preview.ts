import { Component, computed, input } from '@angular/core';
import { IPrivateLabel } from '../constants';
import { EmailContent } from '../email-content/email-content';

@Component({
  selector: 'app-email-preview',
  imports: [EmailContent],
  templateUrl: './email-preview.html',
  styleUrl: './email-preview.css',
})
export class EmailPreview {
  placeholder = input.required<IPrivateLabel>()
  activePreviewConfig = input<IPrivateLabel>()

  
  isDarkTheme = input<boolean>(false);
  
  protected selectedPreview = computed<IPrivateLabel>(() => this.activePreviewConfig() ?? this.placeholder())

  plTheme = computed(() => (this.isDarkTheme() ? '#292929' : 'white'));
}
