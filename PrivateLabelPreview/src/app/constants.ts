export interface IPrivateLabel {
  name: string;
  managerId: string;
  email: IPrivateLabelEmail;
}
export interface IPrivateLabelEmail {
  logoFile: string;
  backgroundColor: string;
  color: string;
}

export interface IView {
  name: string;
  label: string;
}
export const VIEWS: IView[] = [
  { name: 'quick', label: 'Config Builder' },
  { name: 'saved', label: 'Saved Email Configs' },
];
export const SL_SETTINGS = {
  name: 'Xactus Sharper Lending',
  managerId: '9e74c20e-21cf-4f11-bcca-c55c57915b82',
  email: {
    logoFile: 'afLeftNavLogo.png',
    backgroundColor: '#5b068a',
    color: 'white',
  },
}

export const DEFAULT_BGCOLOR = 'fuchsia'

export const PLACEHOLDER_SETTINGS = {
  name: 'Demo Mortgages, Inc.',
  managerId: '1A23B45C-67DE-8F90-GHIJ-K12L34567M89',
  email: {
    logoFile: 'demoEmailLogo.jpg',
    backgroundColor: 'fuchsia',
    color: 'yellow',
  },
}

export const PRIVATE_LABELS: IPrivateLabel[] = [
  {
    name: 'Gold Star Mortgage',
    managerId: 'A70DC5F4-8AB3-4C4C-9048-2535D9ED92F6',
    email: {
      logoFile: 'afGoldStarMortgageLogoEmail.png',
      backgroundColor: '#092950',
      color: '#fff',
    },
  },
  {
    name: 'Wings Financial Credit Union',
    managerId: '071507c1-6869-4c7d-b649-ad4b5bba43c4',
    email: {
      logoFile: 'afEmailLogoWingsFinancialCreditUnion.png',
      backgroundColor: '#a8bee5',
      color: '#003087',
    },
  },
  {
    name: 'FCB Bank',
    managerId: '6e9fc568-7271-43e3-9668-447798979448',
    email: {
      logoFile: 'afEmailLogoFCBBank.png',
      backgroundColor: '#93b5b0',
      color: '#26524b',
    },
  },
  {...SL_SETTINGS},
];
