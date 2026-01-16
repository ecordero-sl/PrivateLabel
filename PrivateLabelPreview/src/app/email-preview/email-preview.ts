import { Component, computed, signal } from '@angular/core';
import { PRIVATE_LABELS, VIEWS } from '../constants';
import { NewConfig } from '../new-config/new-config';

@Component({
  selector: 'app-email-preview',
  imports: [NewConfig],
  templateUrl: './email-preview.html',
  styleUrl: './email-preview.css',
})
export class EmailPreview {
  privateLabels = PRIVATE_LABELS;
  views = VIEWS;
  managerId = signal<string>(this.privateLabels[0].managerId);
  activePreview = computed(() =>
    this.privateLabels.find((pl) => pl.managerId === this.managerId())
  );
  isDarkTheme = signal<boolean>(false);

  plTheme = computed(() => (this.isDarkTheme() ? '#292929' : 'white'));
  plBgColor = computed(() => this.activePreview()?.email.backgroundColor);
  plColor = computed(() => this.activePreview()?.email.color);
  plEmailLogo = computed(() => this.activePreview()?.email.logoFile);
  plTopStyle = computed(
    () =>
      `background-color:${this.plBgColor()} !important;color:${this.plColor()} !important;font-weight:600;width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px;`
  );
  plBottomStyle = computed(
    () =>
      `background-color:${this.plBgColor()} !important;color:${this.plColor()} !important;font-weight:600;width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px`
  );

  currentView = signal<string>(this.views[0].name);
  selectedView = computed(() => this.currentView());

  changeView(index: number): void {
    this.currentView.set(this.views[index].name);
  }
  newConfigSubdomain = signal<string>('dev');
  newConfigName = signal<string>('ACME Mortgages, Inc.');
  newConfigManagerId = signal<string>('1A23B45C-67DE-8F90-GHIJ-K12L34567M89');
  newConfigLogoFile = signal<string>('defaultEmailLogo.jpg');
  newConfigBackgroundColor = signal<string>('fuchsia');
  newConfigColor = signal<string>('yellow');

  onClick(index: number): void {
    this.managerId.set(this.privateLabels[index].managerId);
  }

  onThemeChange(event: any): void {
    console.log(event.target.checked);
    this.isDarkTheme.set(!this.isDarkTheme());
  }
}
