import { Component, computed, input, signal } from '@angular/core';
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
  managerId = input<string>(this.privateLabels[0].managerId, { alias: 'managerIdSelection' });
  activePreview = computed(() =>
    this.privateLabels.find((pl) => pl.managerId === this.managerId())
  );
  isDarkTheme = input<boolean>(false, { alias: 'isDarkThemeSelection' });

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

  xmlDev = computed(() =>
    this.getXml(
      this.activePreview()?.name,
      'dev',
      this.activePreview()?.email.color,
      this.activePreview()?.email.backgroundColor,
      this.activePreview()?.email.logoFile
    )
  );
  xmlProd = computed(() =>
    this.getXml(
      this.activePreview()?.name,
      'www',
      this.activePreview()?.email.color,
      this.activePreview()?.email.backgroundColor,
      this.activePreview()?.email.logoFile
    )
  );

  getXml(name?: string, env?: string, color?: string, bgColor?: string, logoFile?: string): string {
    const defaults = {
      name: 'Default',
      env: 'dev',
      color: 'yellow',
      bgColor: 'red',
      logoFile: 'defaultEmailLogo.jpg',
    };
    const xml = `<privatelabel>
  <applicationurl />
  <logolink>https://${env || defaults.env}.appraisalfirewall.com/afdesktop/assets/ui/${
      logoFile || defaults.logoFile
    }?ver=2</logolink>
  <name>${name || defaults.name}</name>
  <topstyle>background-color:${bgColor || defaults.bgColor};font-weight:600;color:${
      color || defaults.color
    };width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px</topstyle>
  <bottomstyle>background-color:${bgColor || defaults.bgColor};font-weight:600;color:${
      color || defaults.color
    };width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px</bottomstyle>
</privatelabel>`;
    return xml;
  }

  confirmCopyDev = signal<boolean>(false);
  confirmCopyProd = signal<boolean>(false);
  async copyXml(env: string = 'dev'): Promise<void> {
    let textToCopy = env === 'prod' ? this.xmlProd : this.xmlDev;
    try {
      await navigator.clipboard.writeText(textToCopy());
      setTimeout(() => {
        env === 'prod' ? this.confirmCopyProd.set(true) : this.confirmCopyDev.set(true);
      }, 1000);
    } catch (error) {
      console.log('An error occurred while copying:', error);
      this.confirmCopyDev.set(false);
      this.confirmCopyProd.set(false);
    }
    setTimeout(() => {
      this.confirmCopyDev.set(false);
      this.confirmCopyProd.set(false);
    }, 5000);
  }

  currentView = signal<string>(this.views[0].name);
  selectedView = computed(() => this.currentView());
  changeView(index: number): void {
    this.currentView.set(this.views[index].name);
  }

  newConfigName = signal<string>('ACME Mortgages, Inc.');
  newConfigManagerId = signal<string>('1A23B45C-67DE-8F90-GHIJ-K12L34567M89');
  newConfigLogoFile = signal<string>('defaultEmailLogo.jpg');
  newConfigBackgroundColor = signal<string>('fuchsia');
  newConfigColor = signal<string>('yellow');
}
