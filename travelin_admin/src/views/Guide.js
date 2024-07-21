import React, { Fragment, useEffect, useState } from 'react'
import AddGuideModel from './AddGuideModel';
import { ToastContainer } from 'react-toastify';
import { MoreVertical, Trash, Plus } from 'react-feather'
import {
    Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button
} from 'reactstrap'

import { useForm } from 'react-hook-form'
import { handleClick } from './tosti';
const defaultValues = {
    cardNumber: ''
}
export default function Guide() {
    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)

    // ** States
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')

    // ** Hooks
    const {
        formState: { errors }
    } = useForm({ defaultValues })


    const [data, setData] = useState([])

    const [_id, setId] = useState("")
    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
        showDetail()
    }, [])

    function showDetail() {
        fetch('http://localhost:2000/api/guide/getDetail')
            .then((result) => result.json())
            .then((resp) => {
                setData(resp)
                setId(resp[0]._id)
                setName(resp[1].title)
                setDesignation(resp[2].heading)
                setImage(resp[3].image)
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const reverseDetail = [...data].reverse()

    function removeDetail(id) {
        fetch(`http://localhost:2000/api/guide/deleteDetail/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            console.log(result)
            result.json().then((resp) => {
                console.log(resp)
                showDetail()
                handleClick()
            })
        })
    }
    return (
        <div>
            <div className='d-flex mt-md-0 mt-1 mb-1'>
                <Button className='ms-2  btn-outline-dark' color='' onClick={handleModal}>
                    <Plus size={15} />
                    <span className='align-middle ms-50'>Add Record</span>
                </Button>
            </div>
            <Table className='table-hover-animation mt-2' responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reverseDetail.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td width="300px">
                                    {/* <img width="50px" src={`http://localhost:2000/${item.imageUrl}`} /> */}
                                    {item.imageUrl && <img width="50px" src={item.imageUrl} alt="Uploaded" />}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.designation}</td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {/* <DropdownItem href='#' onClick={() => selectList(i)} >
                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                    </DropdownItem>*/}
                                            <DropdownItem href='#' onClick={() => removeDetail(item._id)}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <AddGuideModel open={modal} handleModal={handleModal} />
            <ToastContainer />
        </div>
    )
}
