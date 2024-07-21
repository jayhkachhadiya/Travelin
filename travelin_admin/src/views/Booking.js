import React, { Fragment, useEffect, useState } from 'react'
import AddNewModal from './AddDestiModel';
import axios from 'axios';
import { MoreVertical, ChevronDown, Trash, Plus } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify';
import {
    Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Row,
    Col,
    Modal,
    Label,
    Input,
    ModalBody,
    ModalHeader,
} from 'reactstrap'

import { useForm } from 'react-hook-form'
import { handleClick } from './tosti';
const defaultValues = {
    cardNumber: ''
}

export default function Booking() {
    const [modal, setModal] = useState(false)


    // ** States
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')

    // ** Hooks
    const {
        reset,
        formState: { errors }
    } = useForm({ defaultValues })


    const [data, setData] = useState([])
    const [members, setMembers] = useState([])

    const [_id, setId] = useState("")
    const [fullname, setFullname] = useState("")
    const [mobile, setMobile] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [bordingPoint, setBordingPoint] = useState("")

    useEffect(() => {
        showDetail()
    }, [])

    function showDetail() {
        fetch("http://localhost:2000/api/booking/getBookDetail")
            .then((result) => result.json())
            .then((resp) => {
                setData(resp);
                setId(resp[0]._id);
                setFullname(resp[0].fullname);
                setMobile(resp[0].mobile);
                setGender(resp[0].gender);
                setAge(resp[0].age);
                setEmail(resp[0].email);
                setBordingPoint(resp[0].bordingPoint);
                setMembers(resp[1].members);

                console.log(resp[0].members);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }

    const reverseDetail=[...data].reverse()
    function removeDetail(id) {
        fetch(`http://localhost:2000/api/booking/deleteBookDetail/${id}`, {
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

    const viewMember = (id) => {
        setMembers(data.find(x => x._id == id).members);
        setShow(true)
        console.log(members, "members")
    }

    return (
        <div>
            <div>
                <div>
                    <Table className='table-hover-animation mt-2' responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>userId</th>
                                <th>packageId</th>
                                <th>full name</th>
                                <th>phone</th>
                                <th>gender</th>
                                <th>age</th>
                                <th>email</th>
                                <th>bording point</th>
                                <th>payment Id</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reverseDetail.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.packageId}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.age}</td>
                                        <td>{item.email}</td>
                                        <td>{item.bordingPoint}</td>
                                        <td>0ad311a2sd3a1da546</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='#' onClick={() => viewMember(item._id)} >
                                                        <ChevronDown className='me-50' size={15} /><span className='align-middle'>Member</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='#' onClick={() => removeDetail(item._id)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>


                    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered' onClosed={() => setCardType('')}>
                        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                        <ModalBody className=' mx-50 pb-5'>
                            <h1 className='text-center mb-1'>Member Detail ({members.length})</h1>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>fullname</th>
                                        <th>mobile</th>
                                        <th>gender</th>
                                        <th>age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        members.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.pfullname}</td>
                                                <td>{item.pmobile}</td>
                                                <td>{item.pgender}</td>
                                                <td>{item.page}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <Col className='text-center mt-1' xs={12}>
                                <Button
                                    color='secondary'
                                    outline
                                    onClick={() => {
                                        setShow(!show)
                                        reset()
                                    }}
                                >
                                    Done
                                </Button>
                            </Col>
                        </ModalBody>
                    </Modal>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
