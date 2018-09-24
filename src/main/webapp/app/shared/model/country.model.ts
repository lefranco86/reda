import { IContactInformation } from 'app/shared/model//contact-information.model';
import { IProvince } from 'app/shared/model//province.model';

export interface ICountry {
  id?: number;
  name?: string;
  contactInformation?: IContactInformation;
  provinces?: IProvince[];
}

export const defaultValue: Readonly<ICountry> = {};
