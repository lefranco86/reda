import { IContactInformation } from 'app/shared/model//contact-information.model';
import { IEmployee } from 'app/shared/model//employee.model';

export interface IEntreprise {
  id?: number;
  name?: string;
  contactInformations?: IContactInformation[];
  employees?: IEmployee[];
}

export const defaultValue: Readonly<IEntreprise> = {};
