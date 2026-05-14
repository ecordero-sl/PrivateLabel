import { Component, computed, input, signal } from '@angular/core';
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
  
  isDarkTheme = signal<boolean>(false);
  
  selectedPreview = computed<IPrivateLabel>(() => this.activePreviewConfig() ?? this.placeholder())

  plTheme = computed(() => (this.isDarkTheme() ? '#292929' : 'white'));
  plBgColor = computed(() => this.selectedPreview().email.backgroundColor);
  plColor = computed(() => this.selectedPreview().email.color);
  plEmailLogo = computed(() => this.selectedPreview().email.logoFile);
  plTopStyle = computed(
    () =>
      `background-color:${this.plBgColor()} !important;color:${this.plColor()} !important;font-weight:600;width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px;`
  );
  plBottomStyle = computed(
    () =>
      `background-color:${this.plBgColor()} !important;color:${this.plColor()} !important;font-weight:600;width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px`
  );
}
