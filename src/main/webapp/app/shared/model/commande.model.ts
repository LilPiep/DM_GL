import { IZoneGeographique } from '@/shared/model/zone-geographique.model';
import { IClient } from '@/shared/model/client.model';
import { ILivreur } from '@/shared/model/livreur.model';
import { ICommercant } from '@/shared/model/commercant.model';

import { Paiement } from '@/shared/model/enumerations/paiement.model';
export interface ICommande {
  id?: number;
  commandeID?: number;
  meansOfPayment?: Paiement;
  deadline?: Date | null;
  price?: number | null;
  zoneGeographique?: IZoneGeographique | null;
  client?: IClient | null;
  livreur?: ILivreur | null;
  commercant?: ICommercant | null;
}

export class Commande implements ICommande {
  constructor(
    public id?: number,
    public commandeID?: number,
    public meansOfPayment?: Paiement,
    public deadline?: Date | null,
    public price?: number | null,
    public zoneGeographique?: IZoneGeographique | null,
    public client?: IClient | null,
    public livreur?: ILivreur | null,
    public commercant?: ICommercant | null
  ) {}
}
