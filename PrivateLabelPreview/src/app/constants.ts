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
  { name: 'preview', label: 'Preview' },
  { name: 'xml', label: 'XML' },
  { name: 'new', label: 'Add New +' },
];

export const PRIVATE_LABELS: IPrivateLabel[] = [
  {
    name: 'Default',
    managerId: '9E74C20E-21CF-4F11-BCCA-C55C57915B82',
    email: {
      logoFile: 'defaultEmailLogo.jpg',
      backgroundColor: 'red',
      color: 'yellow',
    },
  },
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
];
