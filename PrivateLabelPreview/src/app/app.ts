import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeSnippet } from './code-snippet/code-snippet';
import { IPrivateLabel, PLACEHOLDER_SETTINGS, PRIVATE_LABELS } from './constants';
import { EmailPreview } from './email-preview/email-preview';
import { FormConfigBuilder } from './form-config-builder/form-config-builder';
import { PreviewControls } from './preview-controls/preview-controls';
import {
  buildPrivateLabelXmlConfig,
  PrivateLabelSubdomain,
} from './private-label-formatting-utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreviewControls, FormConfigBuilder, CodeSnippet, EmailPreview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly modes = {
    build: 'build',
    browse: 'browse',
  } as const;
  readonly browseViews = {
    preview: 'preview',
    config: 'config',
  } as const;

  privateLabels: IPrivateLabel[] = PRIVATE_LABELS;
  placeHolderConfig = { ...PLACEHOLDER_SETTINGS };

  mode = signal<(typeof this.modes)[keyof typeof this.modes]>(this.modes.build);
  browseView = signal<(typeof this.browseViews)[keyof typeof this.browseViews]>(this.browseViews.preview);
  customSubdomain = signal<PrivateLabelSubdomain>('dev');
  acctEmailConfigSnippet = signal<string>('');
  previewConfigSnippet = signal<string>('');
  customConfig = signal<IPrivateLabel[]>([]);
  useDarkPreview = signal<boolean>(false);
  managerId = signal<string>('');
  previewPrivateLabels = computed<IPrivateLabel[]>(() => this.customConfig().concat([...this.privateLabels]));
  activeBrowsePreviewConfig = computed(
    () => this.previewPrivateLabels().find(pl => pl.managerId === this.managerId()) ?? this.placeHolderConfig
  );

  selectedPrivateLabel = computed(
    () => this.previewPrivateLabels().find(pl => pl.managerId === this.managerId()) ?? this.previewPrivateLabels()[0]
  );
  selectedPrivateLabelXMLConfig = computed(() => {
    const privateLabel = this.selectedPrivateLabel();
    const subdomain: PrivateLabelSubdomain = 'dev';
    return buildPrivateLabelXmlConfig(privateLabel, subdomain);
  });

  showBuildMode(): void {
    this.mode.set(this.modes.build);
  }

  showBrowseMode(): void {
    this.mode.set(this.modes.browse);
    this.browseView.set(this.browseViews.preview);
  }

  showBrowsePreview(): void {
    this.browseView.set(this.browseViews.preview);
  }

  showBrowseConfig(): void {
    this.browseView.set(this.browseViews.config);
  }
}
