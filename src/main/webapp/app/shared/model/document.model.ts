import { IInternship } from 'app/shared/model//internship.model';
import { IDocumentType } from 'app/shared/model//document-type.model';

export interface IDocument {
  id?: number;
  targetContentType?: string;
  target?: any;
  name?: string;
  internship?: IInternship;
  documentType?: IDocumentType;
}

export const defaultValue: Readonly<IDocument> = {};
