import { IContactInformation } from 'app/shared/model//contact-information.model';
import { ICohort } from 'app/shared/model//cohort.model';
import { IStudentOffer } from 'app/shared/model//student-offer.model';

export interface IStudent {
  id?: number;
  registrationNumber?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  active?: boolean;
  contactInformation?: IContactInformation;
  cohorts?: ICohort[];
  studentOffers?: IStudentOffer[];
}

export const defaultValue: Readonly<IStudent> = {
  active: false
};
