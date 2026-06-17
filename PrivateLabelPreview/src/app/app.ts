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
  readonly buildViews = {
    configs: 'configs',
    preview: 'preview',
  } as const;
  readonly browseViews = {
    preview: 'preview',
    config: 'config',
  } as const;

  privateLabels: IPrivateLabel[] = PRIVATE_LABELS;
  placeHolderConfig = { ...PLACEHOLDER_SETTINGS };

  mode = signal<(typeof this.modes)[keyof typeof this.modes]>(this.modes.build);
  buildView = signal<(typeof this.buildViews)[keyof typeof this.buildViews]>(this.buildViews.configs);
  browseView = signal<(typeof this.browseViews)[keyof typeof this.browseViews]>(this.browseViews.preview);
  customSubdomain = signal<PrivateLabelSubdomain>('dev');
  acctEmailConfigSnippet = signal<string>('');
  previewConfigSnippet = signal<string>('');
  customConfig = signal<IPrivateLabel[]>([]);
  isBuildFormValid = signal<boolean>(true);
  useDarkPreview = signal<boolean>(false);
  managerId = signal<string>('');
  activeBuildPreviewConfig = computed(() => this.customConfig()[0] ?? this.placeHolderConfig);
  activeBrowsePreviewConfig = computed(
    () => this.privateLabels.find(pl => pl.managerId === this.managerId()) ?? this.placeHolderConfig
  );

  selectedPrivateLabel = computed(
    () => this.privateLabels.find(pl => pl.managerId === this.managerId()) ?? this.privateLabels[0]
  );
  selectedPrivateLabelXMLConfig = computed(() => {
    const privateLabel = this.selectedPrivateLabel();
    const subdomain: PrivateLabelSubdomain = 'dev';
    return buildPrivateLabelXmlConfig(privateLabel, subdomain);
  });

  showBuildMode(): void {
    this.mode.set(this.modes.build);
    this.buildView.set(this.buildViews.configs);
  }

  showBuildConfigs(): void {
    this.buildView.set(this.buildViews.configs);
  }

  showBuildPreview(): void {
    this.buildView.set(this.buildViews.preview);
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
