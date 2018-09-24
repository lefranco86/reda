import { IOffer } from 'app/shared/model//offer.model';

export interface IOfferType {
  id?: number;
  description?: string;
  offers?: IOffer[];
}

export const defaultValue: Readonly<IOfferType> = {};
