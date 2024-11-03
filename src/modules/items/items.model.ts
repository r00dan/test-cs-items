export interface ItemModel {
  id: string;
  tradable: boolean;
  market_hash_name: string;
  currency: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  quantity: number;
  created_at: number;
}
