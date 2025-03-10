export interface TransactionType {
  id?: string | null
  created_at?: string | null
  user_id?: string | null
  user?: { 
    id?: string | null
    name?: string | null
  }
  product_id?: string | null
  product?: {
    id?: string | null
    name?: string | null
    price?: number | null
    image_Url?: string | null
  }
}

