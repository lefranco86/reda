import { IOffer } from 'app/shared/model//offer.model';

export interface ITechnology {
  id?: number;
  name?: string;
  description?: string;
  offers?: IOffer[];
}

export const defaultValue: Readonly<ITechnology> = {};
