import { ICommande } from '@/shared/model/commande.model';

export interface IClient {
  id?: number;
  clientID?: number;
  commandes?: ICommande[] | null;
}

export class Client implements IClient {
  constructor(public id?: number, public clientID?: number, public commandes?: ICommande[] | null) {}
}
