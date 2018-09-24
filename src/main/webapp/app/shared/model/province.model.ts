import { ICountry } from 'app/shared/model//country.model';

export interface IProvince {
  id?: number;
  name?: string;
  country?: ICountry;
}

export const defaultValue: Readonly<IProvince> = {};
