import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeSnippet } from './code-snippet/code-snippet';
import { IPrivateLabel, PLACEHOLDER_SETTINGS, PRIVATE_LABELS } from './constants';
import { EmailPreview } from './email-preview/email-preview';
import { FormConfigBuilder } from './form-config-builder/form-config-builder';
import { PreviewControls } from './preview-controls/preview-controls';

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
    const privateLabel = this.previewPrivateLabels().find(pl => pl.managerId === this.managerId()) ?? this.previewPrivateLabels()[0]
    const subdomain = 'dev'
    const config = `
      <privatelabel>
        <applicationurl />
        <logolink>https://${subdomain}.appraisalfirewall.com/afdesktop/assets/ui/${privateLabel.email.logoFile}?ver=2</logolink>
        <name>${privateLabel.name}</name>
        <topstyle>background-color:${privateLabel.email.backgroundColor};font-weight:600;color:${privateLabel.email.color};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px</topstyle>
        <bottomstyle>background-color:${privateLabel.email.backgroundColor};font-weight:600;color:${privateLabel.email.color};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px</bottomstyle>
      </privatelabel>
    `
    return config
  })
}
