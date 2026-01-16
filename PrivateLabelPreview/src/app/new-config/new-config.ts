import { Component, computed, model, signal } from '@angular/core';

@Component({
  selector: 'app-new-config',
  imports: [],
  templateUrl: './new-config.html',
  styleUrl: './new-config.css',
})
export class NewConfig {
  newConfigSubdomain = model<string>('dev');
  newConfigName = model<string>('New Config');
  newConfigManagerId = model<string>('1A23B45C-67DE-8F90-GHIJ-K12L34567M89');
  newConfigLogoFile = model<string>('defaultEmailLogo.jpg');
  newConfigBackgroundColor = model<string>('fuchsia');
  newConfigColor = model<string>('yellow');

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
  newConfig = computed(
    () => `
    {
      name: ${this.newConfigName()},
      managerId: ${this.newConfigManagerId()},
      email: {
        logoFile: ${this.newConfigLogoFile()},
        backgroundColor: ${this.newConfigBackgroundColor()},
        color: ${this.newConfigColor()},
      }
    }`
  );
  xmlConfig = computed(
    () => `
  <privatelabel>
    <applicationurl />
    <logolink>https://${this.newConfigSubdomain()}.appraisalfirewall.com/afdesktop/assets/ui/${this.newConfigLogoFile()}?ver=2</logolink>
    <name>${this.newConfigName()}</name>
    <topstyle>background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px</topstyle>
    <bottomstyle>background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px</bottomstyle>
  </privatelabel>
  `
  );

  plTopStyle = computed(
    () =>
      `background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px`
  );
  plBottomStyle = computed(
    () =>
      `background-color:${this.newConfigBackgroundColor()};font-weight:600;color:${this.newConfigColor()};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px`
  );

  confirmConfigCopy = signal<boolean>(false);
  async copyPreviewConfig(): Promise<void> {
    let textToCopy = this.newConfig();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => {
        this.confirmConfigCopy.set(true);
      }, 1000);
    } catch (error) {
      console.log('An error occurred while copying:', error);
      this.confirmConfigCopy.set(false);
    }
    setTimeout(() => {
      this.confirmConfigCopy.set(false);
    }, 5000);
  }

  confirmXmlConfigCopy = signal<boolean>(false);
  async copyXmlConfig(): Promise<void> {
    let textToCopy = this.newConfig();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => {
        this.confirmXmlConfigCopy.set(true);
      }, 1000);
    } catch (error) {
      console.log('An error occurred while copying:', error);
      this.confirmXmlConfigCopy.set(false);
    }
    setTimeout(() => {
      this.confirmXmlConfigCopy.set(false);
    }, 5000);
  }
}
