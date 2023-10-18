import React from "react";
import { FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import { CustomButton, CustomButton2 } from "./CustomElement";

const MyModal = ({
  show,
  hideModal,
  modalHeader,
  modalFooter,
  formData,
  handleInputChange,
  handleSubmit,
  handleUpdate,
  buttonDisabled,
}) => {
  return (
    <Modal
      show={show}
      onHide={hideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={modalFooter === "Tambah" ? handleSubmit : handleUpdate}>
        <Modal.Header closeButton className="primary-bg">
          <Modal.Title id="contained-modal-title-vcenter">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="primary-bg">
          <FloatingLabel
            controlId="floatingInput"
            label="Nama Barang"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nama Barang"
              name="Nama"
              value={formData.Nama}
              onChange={handleInputChange}
              style={{ textTransform: "capitalize" }}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Jumlah"
            className="mb-3"
          >
            <Form.Control
              type="number"
              min={0}
              placeholder="Jumlah"
              name="Jumlah"
              value={formData.Jumlah}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer className="primary-bg">
          <CustomButton2 type="button" onClick={hideModal}>
            Tutup
          </CustomButton2>
          <CustomButton type="submit" disabled={buttonDisabled}>
            {modalFooter}{" "}
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              hidden={!buttonDisabled}
            />
          </CustomButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MyModal;
