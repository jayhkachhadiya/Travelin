import React, { Fragment, useEffect, useState } from "react";
import AddNewModal from "./AddDestiModel";
import { ToastContainer, toast } from "react-toastify";
import { MoreVertical, Edit, Trash, Plus } from "react-feather";
import {
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Row,
  Col,
  Modal,
  Label,
  Input,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { handleClick } from "./tosti";
const defaultValues = {
  cardNumber: "",
};
export default function Destination() {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  // ** States
  const [show, setShow] = useState(false);
  const [cardType, setCardType] = useState("");

  // ** Hooks
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (data.cardNumber.length) {
      clearErrors();
    } else {
      setError("cardNumber", { type: "manual" });
    }
  };

  const [data, setData] = useState([]);

  const [_id, setId] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    showDetail();
  }, []);

  function showDetail() {
    fetch("http://localhost:2000/api/destination/getDesti")
      .then((result) => result.json())
      .then((resp) => {
        setData(resp);
        setId(resp[0]._id);
        setState(resp[1].state);
        setPlace(resp[2].place);
        setImage(resp[3].image);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const reverseDetail = [...data].reverse();
  function removeDetail(id) {
    fetch(`http://localhost:2000/api/destination/deleteDesti/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log(result);
      result.json().then((resp) => {
        console.log(resp);
        showDetail();
        handleClick();
      });
    });
  }

  function selectList(id) {
    console.log(data[id]);
    setShow(data[id]);
    let item = data[id];
    setId(item._id);
    setState(item.state);
    setPlace(item.place);
    setImage(item.image);
  }

  async function updateDetail() {
    try {
      const formData = new FormData();
      formData.append("state", state);
      formData.append("place", place);
      formData.append("image", image);
      const response = await fetch(
        `http://localhost:2000/api/destination/updateDesti/${_id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      ).then((result) => {
        console.log("data has been updated", result);
        showDetail();
        handleClick();
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className="d-flex mt-md-0 mt-1 mb-1">
        <Button
          className="ms-2  btn-outline-dark"
          color=""
          onClick={handleModal}
        >
          <Plus size={15} />
          <span className="align-middle ms-50">Add Record</span>
        </Button>
      </div>
      <Table className="table-hover-animation mt-2" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>State</th>
            <th>Place</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td width="300px">
                {item.imageUrl && <img width="50px" src={item.imageUrl} alt="Uploaded" />}
              </td>
              <td>{item.state}</td>
              <td>{item.place}</td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="#" onClick={() => selectList(i)}>
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#"
                      onClick={() => removeDetail(item._id)}
                    >
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
        onClosed={() => setCardType("")}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">Update destination</h1>
          <Row
            tag="form"
            className="gy-1 gx-2 mt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <Col xs={12}>
                            <Label className='form-label' for='credit-card'>
                                Id
                            </Label>
                            <Input placeholder='id' onChange={(e) => setId(e.target.value)} value={_id} />
                        </Col> */}
            <Col xs={12}>
              <Label className="form-label" for="credit-card">
                State
              </Label>
              <Input
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </Col>
            <Col md={12}>
              <Label className="form-label" for="card-name">
                Place
              </Label>
              <Input
                placeholder="Place"
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                value={place}
              />
            </Col>
            <Col md={12}>
              <Label className="form-label" for="card-name">
                Image
              </Label>
              <Input
                placeholder="Place"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Col>
            <Col className="text-center mt-1" xs={12}>
              <Button
                type="submit"
                className="me-1"
                color="success"
                onClick={updateDetail}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                outline
                onClick={() => {
                  setShow(!show);
                  reset();
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <AddNewModal open={modal} handleModal={handleModal} />
      <ToastContainer />
    </div>
  );
}
