import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PRIVATE_LABELS } from './constants';
import { EmailPreview } from './email-preview/email-preview';
import { PlSwitcher } from './pl-switcher/pl-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlSwitcher, EmailPreview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('private-label-email-tester');
  privateLabels = PRIVATE_LABELS;
  managerId = signal<string>(this.privateLabels[0].managerId);
  selectedManagerId = computed(() => this.managerId());
  isDarkTheme = signal<boolean>(false);
  isDarkThemeSelected = computed(() => this.isDarkTheme());
}
