import { injectable } from "inversify";

export interface Purchase {
  id: string;
  item_id: string;
  user_id: string;
  created_at?: Date;
}

@injectable()
export class PurchasesRepository {
  constructor() {}
}
