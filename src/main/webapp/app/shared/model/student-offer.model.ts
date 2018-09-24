import { IInterview } from 'app/shared/model//interview.model';
import { IOffer } from 'app/shared/model//offer.model';
import { IStudent } from 'app/shared/model//student.model';

export const enum StudentOfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED'
}

export interface IStudentOffer {
  id?: number;
  status?: StudentOfferStatus;
  interviews?: IInterview[];
  offer?: IOffer;
  student?: IStudent;
}

export const defaultValue: Readonly<IStudentOffer> = {};
