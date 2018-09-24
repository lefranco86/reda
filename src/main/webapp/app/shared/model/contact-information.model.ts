import { ICountry } from 'app/shared/model//country.model';
import { IEntreprise } from 'app/shared/model//entreprise.model';

export interface IContactInformation {
  id?: number;
  street?: string;
  civicNumber?: number;
  city?: string;
  postalCode?: string;
  apartment?: string;
  phoneNumber?: number;
  phonePost?: number;
  faxNumber?: number;
  faxPost?: number;
  country?: ICountry;
  entreprise?: IEntreprise;
}

export const defaultValue: Readonly<IContactInformation> = {};
