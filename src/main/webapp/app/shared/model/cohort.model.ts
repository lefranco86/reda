import { Moment } from 'moment';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IStudent } from 'app/shared/model//student.model';

export interface ICohort {
  id?: number;
  startDate?: Moment;
  teacher?: ITeacher;
  student?: IStudent;
}

export const defaultValue: Readonly<ICohort> = {};
