import { IProvince } from 'app/shared/model//province.model';
import { IContactInformation } from 'app/shared/model//contact-information.model';

export interface ICountry {
  id?: number;
  name?: string;
  provinces?: IProvince[];
  contactInformation?: IContactInformation;
}

export const defaultValue: Readonly<ICountry> = {};
