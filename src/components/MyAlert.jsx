import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

const MyAlert = ({ showAlert, setShowAlert, alertMessage }) => {
  if (alertMessage.includes("Berhasil")) {
    alertMessage = `<b>Sukses!</b> ${alertMessage}`;
  } else {
    alertMessage = `<b>Oops!</b> ${alertMessage}`;
  }

  useEffect(() => {
    if (showAlert === true) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  return (
    <div>
      <Alert
        show={showAlert}
        variant={alertMessage.includes("Sukses!") ? "success" : "danger"}
      >
        <div dangerouslySetInnerHTML={{ __html: alertMessage }} />
      </Alert>
    </div>
  );
};

export default MyAlert;
