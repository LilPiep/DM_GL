import { ILivreur } from '@/shared/model/livreur.model';
import { ICommercant } from '@/shared/model/commercant.model';

export interface ICooperative {
  id?: number;
  cooperativeName?: string | null;
  livreurs?: ILivreur[] | null;
  commercants?: ICommercant[] | null;
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public cooperativeName?: string | null,
    public livreurs?: ILivreur[] | null,
    public commercants?: ICommercant[] | null
  ) {}
}
