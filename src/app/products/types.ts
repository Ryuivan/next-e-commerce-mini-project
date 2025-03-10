export interface ProductType {
  id?: string | null
  name: string
  description: string
  stok: number
  price: number
  image_Url?: string | null
  created_at?: string | null
  updated_at?: string | null
  user_id?: string | null
  user?: { 
    id?: string | null
    name?: string | null
  }
}


export interface UserType {
  id: string
  created_at: string
  email?: string | null
  password?: string | null
  name?: string | null
  role?: string | null
  updated_at?: string | null
}
