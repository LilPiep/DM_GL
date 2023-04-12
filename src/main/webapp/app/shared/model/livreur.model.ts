import { ICooperative } from '@/shared/model/cooperative.model';
import { ICommande } from '@/shared/model/commande.model';

export interface ILivreur {
  id?: number;
  livreurName?: string;
  livreurID?: number | null;
  cooperative?: ICooperative | null;
  commandes?: ICommande[] | null;
}

export class Livreur implements ILivreur {
  constructor(
    public id?: number,
    public livreurName?: string,
    public livreurID?: number | null,
    public cooperative?: ICooperative | null,
    public commandes?: ICommande[] | null
  ) {}
}
