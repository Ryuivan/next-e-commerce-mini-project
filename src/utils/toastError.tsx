// Third-party Imports
import { toast } from 'react-toastify'

export const ToastError = (errorMsg: string) => {
  toast.error(errorMsg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
