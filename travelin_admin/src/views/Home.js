import React, { useEffect, useState } from 'react';
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { handleClick } from "./tosti";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [OTP, setOtp] = useState("")

  useEffect(() => {
    showDetail()
  }, [])
  const userString = localStorage.getItem("admin-info")
  const userObject = JSON.parse(userString)
  const token = userObject.token


  function showDetail() {
    fetch("http://localhost:2000/api/user/register/getUser", {
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((result) => result.json())
      .then((resp) => {
        setData(resp)
        setId(resp[0].id)
        setName(resp[1].name)
        setEmail(resp[2].email)
        setPassword(resp[3].password)
        setOtp(resp[4].OTP)
      })
  }

  const reverseDetail = [...data].reverse()

  function removeDetail(id) {
    fetch(`http://localhost:2000/api/user/register/deleteUser/${id}`, {
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
    // className='d-flex justify-content-center' style={{ paddingTop: '110px' }}
    <div>
      <Table className='table-hover-animation mt-2' responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Otp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            reverseDetail.map((item, i) =>
              <tr>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>
                  {item.email}
                </td>
                <td>{item.password}</td>
                <td>{item.OTP}</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem href='/' onClick={e => e.preventDefault()}>
                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                      </DropdownItem> */}
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
      <ToastContainer />
    </div >
  );
};

export default Home;
