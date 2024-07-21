import React, { Fragment, useEffect, useState } from 'react'
import AddSliderModel from './AddSliderModel';
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
export default function Slider() {
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
    const [title, setTitle] = useState("")
    const [heading, setHeading] = useState("")
    const [blog, setBlog] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
        showDetail()
    }, [])

    function showDetail() {
        fetch('http://localhost:2000/api/slider/getDetail')
            .then((result) => result.json())
            .then((resp) => {
                setData(resp)
                setId(resp[0]._id)
                setTitle(resp[1].title)
                setHeading(resp[2].heading)
                setBlog(resp[3].blog)
                setImage(resp[4].image)
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const reverseDetail=[...data].reverse()
    function removeDetail(id) {
        fetch(`http://localhost:2000/api/slider/deleteDetail/${id}`, {
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
                        <th>Title</th>
                        <th>Heading</th>
                        <th>Blog</th>
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
                                <td>{item.title}</td>
                                <td>{item.heading}</td>
                                <td>{item.blog}</td>
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

            <AddSliderModel open={modal} handleModal={handleModal} />
            <ToastContainer />
        </div>
    )
}
