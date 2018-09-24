import { IDocument } from 'app/shared/model//document.model';

export interface IDocumentType {
  id?: number;
  description?: string;
  documents?: IDocument[];
}

export const defaultValue: Readonly<IDocumentType> = {};
