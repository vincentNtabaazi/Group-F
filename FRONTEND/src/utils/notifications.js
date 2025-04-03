import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationPage = () => {
    // success notification
    const notifySuccess = () => toast.success("🟢Issue Resolved Successfully!");
    //denial notification
    const notifyError = () => toast.error("🔴Issue Denid!");
    //info notification
    const notifyInfo = () => toast.info("ℹ️ Info: Your issue is under review.")

  return (
    <div>
       <button onClick={notifySuccess}>Show Success</button>
      <button onClick={notifyError}>Show Error</button>
      <button onClick={notifyInfo}>Show Info</button>
    </div>
  )
};

export default NotificationPage;
