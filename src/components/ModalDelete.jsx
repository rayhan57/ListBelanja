import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const ModalDelete = ({ show, hideModal, nama, handleDelete }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Hapus Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>Yakin ingin menghapus {nama}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Batal
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setIsDisabled(true);
            handleDelete();
            setTimeout(() => {
              hideModal();
              setIsDisabled(false);
            }, 2500);
          }}
          disabled={isDisabled}
        >
          Yakin{" "}
          <Spinner as="span" animation="grow" size="sm" hidden={!isDisabled} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
