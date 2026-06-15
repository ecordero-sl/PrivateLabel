import { Component, computed, effect, model, output, signal } from '@angular/core';
import { IPrivateLabel, PLACEHOLDER_SETTINGS } from '../constants';

@Component({
  selector: 'app-form-config-builder',
  imports: [],
  templateUrl: './form-config-builder.html',
  styleUrl: './form-config-builder.css',
})
export class FormConfigBuilder {
  customSubdomain = output<string>()
  customAcctEmailConfig = output<string>()
  customPreviewConfig = output<string>()
  newCustomConfig = output<IPrivateLabel[]>()
  useDarkPreview = output<boolean>()

  isDarkMode = signal<boolean>(false);
  newConfigTheme = computed(() => (this.isDarkMode() ? '#292929' : 'white'));
  
  newConfigSubdomain = model<string>('dev');
  newConfigName = model<string>(PLACEHOLDER_SETTINGS.name);
  newConfigManagerId = model<string>(PLACEHOLDER_SETTINGS.managerId);
  newConfigLogoFile = model<string>(PLACEHOLDER_SETTINGS.email.logoFile);
  newConfigBackgroundColor = model<string>(PLACEHOLDER_SETTINGS.email.backgroundColor);
  newConfigColor = model<string>(PLACEHOLDER_SETTINGS.email.color);

  constructor() {
    effect(() => {
      this.customSubdomain.emit(this.newConfigSubdomain())
      this.customAcctEmailConfig.emit(this.xmlConfigValue())
      this.customPreviewConfig.emit(this.newConfigValue())
      this.newCustomConfig.emit([this.newConfig()])
    })
    effect(() => this.useDarkPreview.emit(this.isDarkMode()))
  }

  updateSubdomain(event: any): void {
    this.newConfigSubdomain.set(event.target.value);
  }
  updateName(event: any): void {
    this.newConfigName.set(event.target.value);
  }
  updateManagerId(event: any): void {
    this.newConfigManagerId.set(event.target.value);
  }
  updateLogoFile(event: any): void {
    this.newConfigLogoFile.set(event.target.value);
  }
  updateConfigBackgroundColor(event: any): void {
    this.newConfigBackgroundColor.set(event.target.value);
  }
  updateConfigColor(event: any): void {
    this.newConfigColor.set(event.target.value);
  }
  newConfig = computed<IPrivateLabel>(() => {
    return {
      name: this.newConfigName(),
      managerId: this.newConfigManagerId(),
      email: {
        logoFile: this.newConfigLogoFile(),
        backgroundColor: this.newConfigBackgroundColor(),
        color: this.newConfigColor(),
      }
    }
  })

  newConfigValue = computed(
    () => {
      const config = 
      `{
        name: ${this.newConfigName()},
        managerId: ${this.newConfigManagerId()},
        email: {
          logoFile: ${this.newConfigLogoFile()},
          backgroundColor: ${this.newConfigBackgroundColor()},
          color: ${this.newConfigColor()},
        }
      }`
      return config
    }
  );

  xmlConfigValue = computed(
    () => {
      const config = 
      `
      <privatelabel>
        <applicationurl />
        <logolink>https://${this.newConfigSubdomain()}.appraisalfirewall.com/afdesktop/assets/ui/${this.newConfigLogoFile()}?ver=2</logolink>
        <name>${this.newConfigName()}</name>
        <topstyle>background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px</topstyle>
        <bottomstyle>background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px</bottomstyle>
      </privatelabel>
      `
      return config
    }
  );

  onThemeChange(event: any): void {
    console.log(event.target.checked);
    this.isDarkMode.set(event.target.checked);
  }
}
