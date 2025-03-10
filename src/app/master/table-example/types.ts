export interface ProductType {
  id?: string | null
  name: string
  description: string
  price: number
  image_Url: string
  created_at?: Date | null
  updated_at?: Date | null
  stok: number
  id_user: string
}
