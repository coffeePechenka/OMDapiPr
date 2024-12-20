import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export default function Notification() {
  return (
    <div>
        <ToastContainer stacked position="bottom-right"/>
    </div>
  )
}
