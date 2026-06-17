import { Component, computed, effect, model, output, signal } from '@angular/core';
import { IPrivateLabel, PLACEHOLDER_SETTINGS } from '../constants';
import {
  buildPreviewToolConfig,
  buildPrivateLabelXmlConfig,
  PrivateLabelSubdomain,
} from '../private-label-formatting-utils';

@Component({
  selector: 'app-form-config-builder',
  imports: [],
  templateUrl: './form-config-builder.html',
  styleUrl: './form-config-builder.css',
})
export class FormConfigBuilder {
  customSubdomain = output<PrivateLabelSubdomain>()
  customAcctEmailConfig = output<string>()
  customPreviewConfig = output<string>()
  newCustomConfig = output<IPrivateLabel[]>()
  formValid = output<boolean>()
  useDarkPreview = output<boolean>()

  isDarkMode = signal<boolean>(false);
  newConfigTheme = computed(() => (this.isDarkMode() ? '#292929' : 'white'));
  
  newConfigSubdomain = model<PrivateLabelSubdomain>('dev');
  newConfigName = model<string>(PLACEHOLDER_SETTINGS.name);
  newConfigManagerId = model<string>(PLACEHOLDER_SETTINGS.managerId);
  newConfigLogoFile = model<string>(PLACEHOLDER_SETTINGS.email.logoFile);
  newConfigBackgroundColor = model<string>(PLACEHOLDER_SETTINGS.email.backgroundColor);
  newConfigColor = model<string>(PLACEHOLDER_SETTINGS.email.color);
  isNameRequired = computed(() => this.newConfigName().trim().length === 0);
  isManagerIdRequired = computed(() => this.newConfigManagerId().trim().length === 0);
  isLogoFileRequired = computed(() => this.newConfigLogoFile().trim().length === 0);
  isBackgroundColorRequired = computed(() => this.newConfigBackgroundColor().trim().length === 0);
  isColorRequired = computed(() => this.newConfigColor().trim().length === 0);
  isFormValid = computed(
    () =>
      !this.isNameRequired() &&
      !this.isManagerIdRequired() &&
      !this.isLogoFileRequired() &&
      !this.isBackgroundColorRequired() &&
      !this.isColorRequired()
  );

  constructor() {
    effect(() => {
      this.customSubdomain.emit(this.newConfigSubdomain())
      this.customAcctEmailConfig.emit(this.xmlConfigValue())
      this.customPreviewConfig.emit(this.newConfigValue())
      this.newCustomConfig.emit([this.newConfig()])
      this.formValid.emit(this.isFormValid())
    })
    effect(() => this.useDarkPreview.emit(this.isDarkMode()))
  }

  updateSubdomain(event: any): void {
    const value = event.target.value;

    if (value === 'dev' || value === 'www') {
      this.newConfigSubdomain.set(value);
    }
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

  newConfigValue = computed(() => buildPreviewToolConfig(this.newConfig()));

  xmlConfigValue = computed(() => {
    return buildPrivateLabelXmlConfig(this.newConfig(), this.newConfigSubdomain())
  });

  onThemeChange(event: any): void {
    console.log(event.target.checked);
    this.isDarkMode.set(event.target.checked);
  }
}
