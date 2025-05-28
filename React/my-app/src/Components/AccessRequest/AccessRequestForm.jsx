import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import  sendAccessRequest  from "./AxiosRequestAccess";

const AccessRequestForm = ({ visible, onHide, memberId, arrPermition }) => {
  const [accessType, setAccessType] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!accessType || !text) {
      alert("נא למלא את כל השדות");
      return;
    }

    setLoading(true);
    const result = await sendAccessRequest({ memberId, accessType, text });
    setLoading(false);

    if (result.success) {
      alert("הבקשה נשלחה בהצלחה");
      onHide();
    } else {
      alert("שגיאה בשליחת הבקשה");
    }
  };

  return (
    <Dialog header="New Access Request" visible={visible} style={{ width: '30vw' }} onHide={onHide} modal>
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="accessType">Choose Access Type</label>
          <Dropdown
            id="accessType"
            value={accessType}
            options={arrPermition} // לא צריך מיפוי! כבר מוכנים עם label/value
            onChange={(e) => setAccessType(e.value)}
            placeholder="Select Access Type"
          />

        </div>

        <div className="field">
          <label htmlFor="text">Explain the request</label>
          <InputTextarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            autoResize
            placeholder="Write a brief explanation here"
          />
        </div>

        <Button
          label="Submit Request"
          icon="pi pi-send"
          onClick={handleSubmit}
          loading={loading}
          className="p-button-success mt-3"
        />
      </div>
    </Dialog>
  );
}
export default AccessRequestForm;