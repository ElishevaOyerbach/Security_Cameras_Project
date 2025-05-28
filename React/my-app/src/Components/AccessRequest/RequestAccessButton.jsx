import React, { useState } from "react";
import { Button } from "primereact/button";
import AccessRequestForm from "./AccessRequestForm";
import ALL_PERMISSIONS from "../AddMembers/AllPermissions"; // <-- תוודאי שזה הנתיב הנכון לקובץ שלך
import { useSelector } from "react-redux";

const RequestAccessButton = () => {
    const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.UserSlice);

    return (
        <> 
            <Button 
            style={{
            backgroundColor: "#00d084",
            color: "#ffffff",
            borderRadius: "10px",
            width: "250px",
            height: "40px",
            margin:"10px",
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
            border: "none",
          }}
                label="Request permission" 
                icon="pi pi-lock-open" 
                onClick={() => setVisible(true)} 
                className="p-button-primary" 
            />
            <AccessRequestForm 
                visible={visible} 
                onHide={() => setVisible(false)} 
                memberId={user._id} 
                arrPermition={ALL_PERMISSIONS} // <-- פה את שולחת את המערך
            />
        </>
    );
}
export default RequestAccessButton;
