import { IStudentOffer } from 'app/shared/model//student-offer.model';
import { ITechnology } from 'app/shared/model//technology.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { IOfferType } from 'app/shared/model//offer-type.model';

export interface IOffer {
  id?: number;
  weeklyHour?: number;
  hourlyRate?: number;
  description?: string;
  studentOffers?: IStudentOffer[];
  technology?: ITechnology;
  employee?: IEmployee;
  offerType?: IOfferType;
}

export const defaultValue: Readonly<IOffer> = {};
