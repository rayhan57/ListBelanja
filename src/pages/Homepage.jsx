import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MyTable from "../components/MyTable";
import { Button, Col, Container, Row } from "react-bootstrap";
import MyModal from "../components/MyModal";
import MyAlert from "../components/MyAlert";
import { CustomButton } from "../components/CustomElement";
import clear from "../assets/svg/clear.svg";

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxJbwyyYu20epChisOezBv4pz6neuwfFr4bhgzKG2p71iqsvCyUxWAB_2aP4FoSBvHP/exec";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalHeader, setModalHeader] = useState("Tambah Barang");
  const [modalFooter, setModalFooter] = useState("Tambah");
  const [formData, setformData] = useState({
    ID: uuidv4(),
    Nama: "",
    Jumlah: "",
    Status: "Belum",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const getData = () => {
    axios
      .get(scriptURL)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("Error getting data", error);
      });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const handleInputChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToAdd = `${scriptURL}?action=add&ID=${formData.ID}&Nama=${formData.Nama}&Jumlah=${formData.Jumlah}&Status=${formData.Status}`;
    setButtonDisabled(true);

    try {
      const response = await axios.post(dataToAdd);
      if (response.status === 200) {
        setModalShow(false);
        setShowAlert(true);
        setAlertMessage("Berhasil menambahkan barang");
        console.log("Success", response);
      } else {
        setShowAlert(true);
        setAlertMessage("Gagal menambahkan barang");
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataToUpdate = `${scriptURL}?action=edit&ID=${formData.ID}&Nama=${formData.Nama}&Jumlah=${formData.Jumlah}&Status=${formData.Status}`;
    setButtonDisabled(true);

    try {
      const response = await axios.post(dataToUpdate);
      if (response.status === 200) {
        setModalShow(false);
        setShowAlert(true);
        setAlertMessage("Berhasil mengubah barang");
        console.log("Success", response);
      } else {
        setShowAlert(true);
        setAlertMessage("Gagal mengubah barang");
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleDelete = async (id) => {
    const dataToDelete = `${scriptURL}?action=delete&ID=${id}`;

    try {
      const response = await axios.post(dataToDelete);
      if (response.status === 200) {
        setShowAlert(true);
        setAlertMessage("Berhasil menghapus barang");
        console.log("Success", response);
      } else {
        setShowAlert(true);
        setAlertMessage("Gagal menghapus barang");
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleStatus = async (id, nama, jumlah, status) => {
    const setStatus = `${scriptURL}?action=edit&ID=${id}&Nama=${nama}&Jumlah=${jumlah}&Status=${status}`;

    try {
      const response = await axios.post(setStatus);
      if (response.status === 200) {
        console.log("Success", response);
      } else {
        console.log("Gagal", response);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleClear = async () => {
    const clearData = `${scriptURL}?action=clear&ID`;

    try {
      const response = await axios.post(clearData);
      if (response.status === 200) {
        setShowAlert(true);
        setAlertMessage("Berhasil menghapus seluruh barang");
        console.log("Success", response);
      } else {
        setShowAlert(true);
        setAlertMessage("Gagal menghapus seluruh barang");
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const formReset = () => {
    setformData({
      ID: uuidv4(),
      Nama: "",
      Jumlah: "",
      Status: "Belum",
    });
    setButtonDisabled(false);
  };

  useEffect(() => {
    if (modalShow === false) {
      formReset();
    }
  }, [modalShow]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 text-quaternary">LIST BELANJA</h1>
      <Row className="mb-2">
        <MyAlert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMessage={alertMessage}
        />
        <Col>
          <CustomButton
            onClick={() => {
              setModalShow(true);
              setModalHeader("Tambah Barang");
              setModalFooter("Tambah");
            }}
          >
            <i className="fa-solid fa-plus"></i> Tambah
          </CustomButton>
        </Col>
        <MyModal
          show={modalShow}
          hideModal={() => setModalShow(false)}
          modalHeader={modalHeader}
          modalFooter={modalFooter}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          buttonDisabled={buttonDisabled}
        />
      </Row>

      <Row className="mb-2">
        <MyTable
          data={data}
          setFormData={setformData}
          setModalShow={setModalShow}
          setModalHeader={setModalHeader}
          setModalFooter={setModalFooter}
          handleDelete={handleDelete}
          handleStatus={handleStatus}
          handleClear={handleClear}
        />
      </Row>

      <Row>
        <Col>
          {data && data.length > 0 ? (
            <Button
              variant="danger"
              onClick={() => {
                if (confirm("Hapus semua barang?")) {
                  handleClear();
                }
              }}
            >
              Bersihkan <img src={clear} />
            </Button>
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
