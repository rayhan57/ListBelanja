import React from "react";
import { Badge, Button } from "react-bootstrap";
import { CustomTable } from "./CustomElement";

const MyTable = ({
  data,
  setFormData,
  setModalShow,
  setModalHeader,
  setModalFooter,
  handleDelete,
  handleStatus,
}) => {
  const loadingButton = `<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm"></span>`;
  const checkButton = `<i class="fa-solid fa-check"></i>`;
  const deleteButton = `<i class="fa-solid fa-trash"></i>`;

  return (
    <div>
      <div className="overflow-x-auto rounded">
        <CustomTable className="w-100">
          <thead>
            <tr>
              <th width="100px">No</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Ubah/Hapus</th>
              <th>Siap</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.Nama}</td>
                  <td>{item.Jumlah}</td>
                  <td>
                    <Badge
                      bg={item.Status === "Belum" ? "secondary" : "success"}
                    >
                      {item.Status}
                    </Badge>
                  </td>
                  <td className="d-flex">
                    {/* Button edit */}
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-1"
                      onClick={() => {
                        setModalShow(true);
                        setModalHeader("Ubah Barang");
                        setModalFooter("Ubah");
                        setFormData({
                          ID: item.ID,
                          Nama: item.Nama,
                          Jumlah: item.Jumlah,
                          Status: item.Status,
                        });
                      }}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                    {/* Button delete */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        const currentButton = e.currentTarget;
                        currentButton.innerHTML = loadingButton;
                        setTimeout(() => {
                          currentButton.innerHTML = deleteButton;
                        }, 2000);
                        handleDelete(item.ID);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>{" "}
                    </Button>
                  </td>
                  <td>
                    {/* Button checklist */}
                    <Button
                      variant={
                        item.Status === "Belum" ? "outline-info" : "info"
                      }
                      size="sm"
                      onClick={(e) => {
                        const currentButton = e.currentTarget;
                        currentButton.innerHTML = loadingButton;
                        setTimeout(() => {
                          currentButton.innerHTML = checkButton;
                        }, 2000);
                        const newStatus =
                          item.Status === "Sudah" ? "Belum" : "Sudah";
                        handleStatus(
                          item.ID,
                          item.Nama,
                          item.Jumlah,
                          newStatus
                        );
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Belum ada barang.
                </td>
              </tr>
            )}
          </tbody>
        </CustomTable>
      </div>
    </div>
  );
};

export default MyTable;
