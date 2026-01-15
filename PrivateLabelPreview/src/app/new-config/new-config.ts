import { Component, computed, model } from '@angular/core';

@Component({
  selector: 'app-new-config',
  imports: [],
  templateUrl: './new-config.html',
  styleUrl: './new-config.css',
})
export class NewConfig {
  newConfigName = model<string>('New Config');
  newConfigManagerId = model<string>('1A23B45C-67DE-8F90-GHIJ-K12L34567M89');
  newConfigLogoFile = model<string>('defaultEmailLogo.jpg');
  newConfigBackgroundColor = model<string>('fuchsia');
  newConfigColor = model<string>('yellow');

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
}
