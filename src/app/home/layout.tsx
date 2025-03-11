<<<<<<< HEAD
// Type Imports
import Button from '@mui/material/Button'

import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
=======
import { Button } from '@mui/material'

import type { ChildrenType } from '@/@core/types'

// 🔹 Helpers & Utilities
import { getMode, getSystemMode } from '@/@core/utils/serverHelpers'
import { createClient } from '@/utils/supabase/server'

// 🔹 Layouts
import HorizontalLayout from '@/@layouts/HorizontalLayout'
import VerticalLayout from '@/@layouts/VerticalLayout'
import LayoutWrapper from '@/@layouts/LayoutWrapper'

// 🔹 Components
>>>>>>> upstream/main
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
<<<<<<< HEAD

// Util Imports
import { getMode, getSystemMode } from '@core/utils/serverHelpers'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
=======
import { getUserRole } from '../products/actions'

/**
 * Fetch user role from the database
 * @param {string} id - User ID
 * @returns {Promise<'admin' | 'user' | undefined>} - The role of the user
 */

const ProductsLayout = async ({ children }: ChildrenType) => {
>>>>>>> upstream/main
  const direction = 'ltr'
  const mode = await getMode()
  const systemMode = await getSystemMode()

<<<<<<< HEAD
=======
  // 🔹 Get user data
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''

  // 🔹 Fetch user role
  const userRole = await getUserRole(userId)

>>>>>>> upstream/main
  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
<<<<<<< HEAD
          <VerticalLayout navigation={<Navigation mode={mode} />} navbar={<Navbar />} footer={<VerticalFooter />}>
=======
          <VerticalLayout
            navigation={<Navigation mode={mode} role={userRole} />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
>>>>>>> upstream/main
            {children}
          </VerticalLayout>
        }
        horizontalLayout={<HorizontalLayout footer={<HorizontalFooter />}>{children}</HorizontalLayout>}
      />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='tabler-arrow-up' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

<<<<<<< HEAD
export default Layout
=======
export default ProductsLayout
>>>>>>> upstream/main
