import { IPrivateLabel, IPrivateLabelEmail } from './constants';

export type PrivateLabelSubdomain = 'dev' | 'www';

export function buildEmailTopStyle(emailConfig: IPrivateLabelEmail): string {
    return `background-color:${emailConfig.backgroundColor};font-weight:600;color:${emailConfig.color};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px`;
}

export function buildEmailBottomStyle(emailConfig: IPrivateLabelEmail): string {
    return `background-color:${emailConfig.backgroundColor};font-weight:600;color:${emailConfig.color};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px`
}

export function buildPrivateLabelXmlConfig(
    privateLabel: IPrivateLabel,
    subdomain: PrivateLabelSubdomain
): string {
    return `
      <privatelabel>
        <applicationurl />
        <logolink>https://${subdomain}.appraisalfirewall.com/afdesktop/assets/ui/${privateLabel.email.logoFile}?ver=2</logolink>
        <name>${privateLabel.name}</name>
        <topstyle>${buildEmailTopStyle(privateLabel.email)}</topstyle>
        <bottomstyle>${buildEmailBottomStyle(privateLabel.email)}</bottomstyle>
      </privatelabel>
    `
}

export function buildPreviewToolConfig(privateLabel: IPrivateLabel): string {
    return `{
        name: ${privateLabel.name},
        managerId: ${privateLabel.managerId},
        email: {
          logoFile: ${privateLabel.email.logoFile},
          backgroundColor: ${privateLabel.email.backgroundColor},
          color: ${privateLabel.email.color},
        }
      }`
}
