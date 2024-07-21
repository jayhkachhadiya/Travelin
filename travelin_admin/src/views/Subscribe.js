import React, { useEffect, useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import { handleClick } from './tosti';

export default function Subscribe() {

    const [data, setData] = useState([])

    const [id, setId] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        fetch('http://localhost:2000/api/subscribe/getEmail')
            .then((result) => result.json())
            .then((resp) => {
                setData(resp)
                setId(resp[0].id)
                setEmail(resp[1].email)
            })
    }
    const reverseDetail = [...data].reverse()
    function removeDetail(id) {
        fetch(`http://localhost:2000/api/subscribe/deleteEmail/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            console.log(result)
            result.json().then((resp) => {
                console.log(resp)
                getList()
                handleClick()
            })
        })
    }
    return (
        <div>
            <Table className='table-hover-animation mt-2' responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reverseDetail.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.email}</td>
                                <td>
                                    <DropdownItem href='#' onClick={() => removeDetail(item._id)}>
                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                    </DropdownItem>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <ToastContainer />
        </div>
    )
}
