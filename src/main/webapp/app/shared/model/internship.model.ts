import { Moment } from 'moment';
import { IDocument } from 'app/shared/model//document.model';
import { IInterview } from 'app/shared/model//interview.model';

export interface IInternship {
  id?: number;
  hourlyRate?: number;
  weeklyHour?: number;
  specialRate?: number;
  start?: Moment;
  end?: Moment;
  documents?: IDocument[];
  interview?: IInterview;
}

export const defaultValue: Readonly<IInternship> = {};
