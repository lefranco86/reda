import { Moment } from 'moment';
import { IInternship } from 'app/shared/model//internship.model';
import { IStudentOffer } from 'app/shared/model//student-offer.model';

export interface IInterview {
  id?: number;
  date?: Moment;
  result?: string;
  internships?: IInternship[];
  studentOffer?: IStudentOffer;
}

export const defaultValue: Readonly<IInterview> = {};
