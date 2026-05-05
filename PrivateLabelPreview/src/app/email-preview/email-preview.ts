import { Component, computed, signal } from '@angular/core';
import { IPrivateLabel, PLACEHOLDER_SETTINGS, PRIVATE_LABELS, VIEWS } from '../constants';
import { EmailContent } from '../email-content/email-content';
import { NewConfig } from '../new-config/new-config';

@Component({
  selector: 'app-email-preview',
  imports: [NewConfig, EmailContent],
  templateUrl: './email-preview.html',
  styleUrl: './email-preview.css',
})
export class EmailPreview {
  placeholder = PLACEHOLDER_SETTINGS
  privateLabels = PRIVATE_LABELS;
  views = VIEWS;
  managerId = signal<string>(this.privateLabels[0].managerId);
  activePreview = computed(() =>
    this.privateLabels.find((pl) => pl.managerId === this.managerId())
  );
  isDarkTheme = signal<boolean>(false);

  plTheme = computed(() => (this.isDarkTheme() ? '#292929' : 'white'));
  plBgColor = computed(() => this.activePreview()?.email.backgroundColor ? this.activePreview()?.email.backgroundColor : this.placeholder.email.backgroundColor);
  plColor = computed(() => this.activePreview()?.email.color ? this.activePreview()?.email.color : this.placeholder.email.color);
  plEmailLogo = computed(() => this.activePreview()?.email.logoFile ? this.activePreview()?.email.logoFile : this.placeholder.email.logoFile);
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
  newConfigName = signal<string>(this.placeholder.name);
  newConfigManagerId = signal<string>(this.placeholder.managerId);
  newConfigLogoFile = signal<string>(this.placeholder.email.logoFile);
  newConfigBackgroundColor = signal<string>(this.placeholder.email.backgroundColor);
  newConfigColor = signal<string>(this.placeholder.email.color);
  
  newConfig = computed<IPrivateLabel>(() => {
    const config = {
      name: this.newConfigName(),
      managerId: this.newConfigManagerId(),
      email: {
        logoFile: this.newConfigLogoFile(),
        backgroundColor: this.newConfigBackgroundColor(),
        color: this.newConfigColor(),
      }
    }
    console.log('config', JSON.stringify(config))
    console.log('placeholder',this.placeholder)
    return config
  })

  onClick(index: number): void {
    this.managerId.set(this.privateLabels[index].managerId);
  }

  onThemeChange(event: any): void {
    console.log(event.target.checked);
    this.isDarkTheme.set(!this.isDarkTheme());
  }
}
