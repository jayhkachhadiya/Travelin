// ** React Imports
import React, { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Flatpickr from "react-flatpickr";
import { User, Briefcase, Mail, Calendar, DollarSign, X } from "react-feather";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { json } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { handleClick } from "./tosti";

const AddNewModal = ({ open, handleModal }) => {
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  const [image, setImage] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
//   const validationSchema = Yup.object().shape({
//     state: Yup.string().required("State is required"),
//     place: Yup.string().required("Place is required"),
//     image: Yup.mixed().required("Image is required"),
//   });

//   const initialState = {
//     state: "",
//     place: "",
//     image: "",
//   };
const addDetail = async () => {
    console.warn('Before FormData:', image);
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('state', state);
        formData.append('place', place);

        console.log('After FormData:', formData);

        console.log(formData)
        const response = await axios.post('http://localhost:2000/api/destination/postDesti', formData, {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        handleClick()
        window.location.href = '/destination'
        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};




//   const addDetail = async (values, { setSubmitting }) => {
//     console.warn("Before FormData:", values.image);
//     try {
//       const formData = new FormData();
//       formData.append("image", values.image);
//       formData.append("state", values.state);
//       formData.append("place", values.place);

//       console.log("After FormData:", formData);
//       const response = await axios.post(
//         "http://localhost:2000/api/destination/postDesti",
//         formData,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       handleModal(); // Close the modal after successful submission
//     //   window.location.href = "/destination"; // Redirect after successful submission
//       console.log("File uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       if (setSubmitting) {
//         setSubmitting(false); // Ensure to set submitting to false after API call, regardless of success or failure
//       } // Ensure to set submitting to false after API call, regardless of success or failure
//     }
//   };

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={handleModal}
        className="sidebar-sm"
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <ModalHeader
          className="mb-1"
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        >
          <h5 className="modal-title">New Record</h5>
        </ModalHeader>
        <ModalBody className="flex-grow-1">
          {/* <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await addDetail(values, { setSubmitting });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-1">
                  <Label className="form-label" htmlFor="state">
                    State
                  </Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="state"
                      id="state"
                      placeholder="The place of heaven"
                      as={Input}
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" htmlFor="place">
                    Place
                  </Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="place"
                      id="place"
                      placeholder="Kedarnath"
                      as={Input}
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="place"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" htmlFor="image">
                    Image
                  </Label>
                  <InputGroup>
                    <Field type="file" name="image" id="image" as={Input} />
                  </InputGroup>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Button
                  type="submit"
                  className="me-1"
                  color="success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button color="secondary" onClick={handleModal} outline>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik> */}
                 <Modal
                isOpen={open}
                toggle={handleModal}
                className='sidebar-sm'
                modalClassName='modal-slide-in'
                contentClassName='pt-0'
            >
                <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                    <h5 className='modal-title'>New Record</h5>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <div className='mb-1'>
                        <Label className='form-label' for='full-name'>
                            State
                        </Label>
                        <InputGroup>
                            {/* <InputGroupText>
              <User size={15} />
            </InputGroupText> */}
                            <Input id='full-name' placeholder='The place of heaven' onChange={(e) => { setState(e.target.value) }} />
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='post'>
                            Place
                        </Label>
                        <InputGroup>
                            {/* <InputGroupText>
              <Briefcase size={15} />
            </InputGroupText> */}
                            <Input id='post' placeholder='Kedarnath' onChange={(e) => { setPlace(e.target.value) }} />
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='image'>
                            image
                        </Label>
                        <InputGroup>
                            {/* <InputGroupText>
              <Mail size={15} />
            </InputGroupText> */}
                            <Input type='file' onChange={(e) => { setImage(e.target.files[0]) }} />
                        </InputGroup>
                    </div>

                    <Button className='me-1' color='success' onClick={addDetail}>
                        Submit
                    </Button>
                    <Button color='secondary' onClick={handleModal} outline>
                        Cancel
                    </Button>
                </ModalBody>
            </Modal>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AddNewModal;
