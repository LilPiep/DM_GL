import { ICooperative } from '@/shared/model/cooperative.model';
import { ICommande } from '@/shared/model/commande.model';

export interface ICommercant {
  id?: number;
  commercantID?: number;
  commercantType?: string | null;
  shopUrl?: string | null;
  cooperative?: ICooperative | null;
  commandes?: ICommande[] | null;
}

export class Commercant implements ICommercant {
  constructor(
    public id?: number,
    public commercantID?: number,
    public commercantType?: string | null,
    public shopUrl?: string | null,
    public cooperative?: ICooperative | null,
    public commandes?: ICommande[] | null
  ) {}
}
