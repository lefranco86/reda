import { IContactInformation } from 'app/shared/model//contact-information.model';
import { ICohort } from 'app/shared/model//cohort.model';

export interface ITeacher {
  id?: number;
  registrationNumber?: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  contactInformation?: IContactInformation;
  cohorts?: ICohort[];
}

export const defaultValue: Readonly<ITeacher> = {};
