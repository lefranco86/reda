import { IStudent } from 'app/shared/model//student.model';
import { ICountry } from 'app/shared/model//country.model';
import { IEntreprise } from 'app/shared/model//entreprise.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { ITeacher } from 'app/shared/model//teacher.model';

export interface IContactInformation {
  id?: number;
  street?: string;
  civicNumber?: number;
  city?: string;
  postalCode?: string;
  apartment?: string;
  phoneNumber?: number;
  phonePost?: number;
  faxNumber?: number;
  faxPost?: number;
  student?: IStudent;
  country?: ICountry;
  entreprise?: IEntreprise;
  employee?: IEmployee;
  teacher?: ITeacher;
}

export const defaultValue: Readonly<IContactInformation> = {};
