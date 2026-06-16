import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeSnippet } from './code-snippet/code-snippet';
import { IPrivateLabel, PLACEHOLDER_SETTINGS, PRIVATE_LABELS } from './constants';
import { EmailPreview } from './email-preview/email-preview';
import { FormConfigBuilder } from './form-config-builder/form-config-builder';
import { PreviewControls } from './preview-controls/preview-controls';
import { buildPrivateLabelXmlConfig } from './private-label-formatting-utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreviewControls, FormConfigBuilder, CodeSnippet, EmailPreview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  privateLabels: IPrivateLabel[] = PRIVATE_LABELS;
  placeHolderConfig = {...PLACEHOLDER_SETTINGS}

  customSubdomain = signal<string>('')
  acctEmailConfigSnippet = signal<string>('')
  previewConfigSnippet = signal<string>('')
  customConfig = signal<IPrivateLabel[]>([])
  useDarkPreview = signal<boolean>(false)
  managerId = signal<string>('');
  previewPrivateLabels = computed<IPrivateLabel[]>(() => this.customConfig().concat([...this.privateLabels]));
  previewConfig = computed(() => {
    return this.privateLabels.find(pl => pl.managerId === (this.managerId())) ?? this.placeHolderConfig
  })

  selectedPrivateLabel = computed(() => this.previewPrivateLabels().find(pl => pl.managerId === this.managerId()) ?? this.previewPrivateLabels()[0])
  selectedPrivateLabelXMLConfig = computed(() => {
    const privateLabel = this.selectedPrivateLabel()
    const subdomain = 'dev'
    return buildPrivateLabelXmlConfig(privateLabel, subdomain)
  })
}
