export interface ProductType {
  id?: string | null
  name: string
  description: string
  price: number
  image_Url: string
  created_at?: string | null
  updated_at?: string | null
  stok: number
  id_user?: string
}
