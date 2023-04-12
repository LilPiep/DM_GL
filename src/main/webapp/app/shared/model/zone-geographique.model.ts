import { ICommande } from '@/shared/model/commande.model';

export interface IZoneGeographique {
  id?: number;
  zoneAddress?: string | null;
  commandes?: ICommande[] | null;
}

export class ZoneGeographique implements IZoneGeographique {
  constructor(public id?: number, public zoneAddress?: string | null, public commandes?: ICommande[] | null) {}
}
