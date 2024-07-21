// ** React Imports
import React, { useState } from 'react';
import axios from 'axios';

import { X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { json } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleClick } from './tosti';

export default function AddGuideModel({ open, handleModal }) {
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")
    const [image, setImage] = useState(null)

    const addDetail = async ({open, handleModal}) => {
        console.warn('Before FormData:', image);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('designation', designation);

            console.log('After FormData:', formData);

            console.log(formData)
            const response = await axios.post('http://localhost:2000/api/guide/postDetail', formData, {
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            handleClick()
            window.location.href = '/guide'
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (
        <div>
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
                            Name :
                        </Label>
                        <InputGroup>
                            <Input id='full-name' placeholder='enter title' onChange={(e) => { setName(e.target.value) }} />
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='post'>
                            Designation
                        </Label>
                        <InputGroup>
                            <Input id='post' placeholder='enter heading' onChange={(e) => { setDesignation(e.target.value) }} />
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='image'>
                            image
                        </Label>
                        <InputGroup>

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
            <ToastContainer />
        </div>
    )
}
