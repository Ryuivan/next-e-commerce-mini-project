// Third-party Imports
import { toast } from 'react-toastify'

export const ToastSuccess = (successMsg: string) => {
  toast.success(successMsg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true, // Menghilangkan progress bar
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}
