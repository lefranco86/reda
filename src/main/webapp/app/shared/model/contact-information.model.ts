import { ICountry } from 'app/shared/model//country.model';
import { IStudent } from 'app/shared/model//student.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IEntreprise } from 'app/shared/model//entreprise.model';

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
  country?: ICountry;
  student?: IStudent;
  employee?: IEmployee;
  teacher?: ITeacher;
  entreprises?: IEntreprise[];
}

export const defaultValue: Readonly<IContactInformation> = {};
