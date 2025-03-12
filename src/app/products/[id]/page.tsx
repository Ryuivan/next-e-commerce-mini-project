import { createClient } from '@/utils/supabase/server'
import { getProductDetailById } from '../actions'
import ProductDetail from '../components/ProductDetail'

type ProductDetailPageProps = {
  params: {
    id: string
  }
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params

  const product = await getProductDetailById(id)

  // 🔹 Get user data
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''

  // const id_user = '5cf1c605-e10e-46b2-86d0-23ba4a367c1a'

  return <ProductDetail product={product} userId={userId} />
}

export default ProductDetailPage
