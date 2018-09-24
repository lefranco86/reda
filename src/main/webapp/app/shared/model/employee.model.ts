import { IContactInformation } from 'app/shared/model//contact-information.model';
import { IOffer } from 'app/shared/model//offer.model';
import { IEntreprise } from 'app/shared/model//entreprise.model';

export interface IEmployee {
  id?: number;
  lastname?: string;
  firstname?: string;
  job?: string;
  email?: string;
  contactInformation?: IContactInformation;
  offers?: IOffer[];
  entreprise?: IEntreprise;
}

export const defaultValue: Readonly<IEmployee> = {};
