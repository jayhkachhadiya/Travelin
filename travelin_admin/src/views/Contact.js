import React, { useEffect, useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import { handleClick } from './tosti';
function Contact() {

    const [data, setData] = useState([])
    const [contactList, setContactList] = useState([]);

    const [id, setId] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        fetch('http://localhost:2000/api/contact/getDetail')
            .then((result) => result.json())
            .then((resp) => {
                const filteredData = resp.filter(item => item.isDeleted === false);
                setData(filteredData)
                setId(resp[0].id)
                setFirstname(resp[1].firstname)
                setLastname(resp[2].lastname)
                setEmail(resp[3].email)
                setPhone(resp[4].phone)
                setMessage(resp[5].message)
            })
    }

    const reverseDetail = [...data].reverse()

    function deleteList(id) {
        alert(id)
        fetch(`http://localhost:2000/api/contact/deleteDetail/${id}`, {
            method: "PUT",  // Use PATCH instead of DELETE for soft delete
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deleted: true }),  // Pass data to mark as deleted
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                // Optionally, you can update the state or refetch the data after soft delete
                getList();
                handleClick()
            });
        });
    }
    return (
        <div>
            <Table className='table-hover-animation mt-2' responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>email</th>
                        <th>mobile</th>
                        <th>description</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.message}</td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {/* <DropdownItem href='#' onClick={e => e.preventDefault()}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem> */}
                                            <DropdownItem href='#' onClick={() => deleteList(item._id)}>
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
            <ToastContainer />
        </div>
    )
}

export default Contact