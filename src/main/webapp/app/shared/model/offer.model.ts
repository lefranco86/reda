import { IStudentOffer } from 'app/shared/model//student-offer.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { IOfferType } from 'app/shared/model//offer-type.model';
import { ITechnology } from 'app/shared/model//technology.model';

export interface IOffer {
  id?: number;
  weeklyHour?: number;
  hourlyRate?: number;
  description?: string;
  studentOffers?: IStudentOffer[];
  employee?: IEmployee;
  type?: IOfferType;
  technologies?: ITechnology[];
}

export const defaultValue: Readonly<IOffer> = {};
