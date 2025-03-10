import type { ChildrenType } from '@/@core/types'

// 🔹 Helpers & Utilities
import { getMode, getSystemMode } from '@/@core/utils/serverHelpers'
import { createClient } from '@/utils/supabase/server'

// 🔹 Layouts
import HorizontalLayout from '@/@layouts/HorizontalLayout'
import VerticalLayout from '@/@layouts/VerticalLayout'
import LayoutWrapper from '@/@layouts/LayoutWrapper'

// 🔹 Components
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'

/**
 * Fetch user role from the database
 * @param {string} id - User ID
 * @returns {Promise<'admin' | 'user' | undefined>} - The role of the user
 */
const getUserRole = async (id: string): Promise<'admin' | 'user' | undefined> => {
  if (!id) return 'user' // Default role untuk pengguna tanpa ID

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('user').select('role').eq('id', id).single()

    if (error) {
      console.error('Error fetching user role:', error)

      return undefined
    }

    return data?.role ?? 'user'
  } catch (err) {
    console.error('Unexpected error fetching user role:', err)

    return undefined
  }
}

const ProductsLayout = async ({ children }: ChildrenType) => {
  const direction = 'ltr'
  const mode = await getMode()
  const systemMode = await getSystemMode()

  // 🔹 Get user data
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''
  
  // 🔹 Fetch user role
  const userRole = await getUserRole(userId)

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation mode={mode} role={userRole} />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={<HorizontalLayout footer={<HorizontalFooter />}>{children}</HorizontalLayout>}
      />
      <ScrollToTop children={children} />
    </Providers>
  )
}

export default ProductsLayout
