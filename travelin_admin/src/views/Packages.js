import React, { useEffect, useState } from "react";
import AddNewModal from './AddPackageModal';
import { MoreVertical, Edit, Trash, Plus } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleClick } from "./tosti";
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


const defaultValues = {
  cardNumber: ''
}


const SecondPage = () => {
  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)

  // ** States
  const [show, setShow] = useState(false)
  const [cardType, setCardType] = useState('')

  // ** Hooks
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data.cardNumber.length) {
      clearErrors()
    } else {
      setError('cardNumber', { type: 'manual' })
    }
  }



  const [data, setData] = useState([])

  const [_id, setId] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [destination, setDestination] = useState("")
  const [description, setDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [maxPeople, setMaxPeople] = useState("")
  const [price, setPrice] = useState("")
  const [day, setDay] = useState("")
  const [minAge, setMinAge] = useState("")
  const [date, setDate] = useState("")
  const [tag, setTag] = useState("")

  useEffect(() => {
    showDetail()
  }, [])

  function showDetail() {
    fetch("http://localhost:2000/api/package/getPackage")
      .then((result) => result.json())
      .then((resp) => {
        setData(resp)
        setId(resp[0]._id)
        setName(resp[1].name)
        setImage(resp[2].image)
        setDestination(resp[3].destination)
        setDuration(resp[4].duration)
        setDescription(resp[5].description)
        setLongDescription(resp[6].longDescription)
        setPrice(resp[7].price)
        setMaxPeople(resp[8].maxPeople)
        setPrice(resp[9].day)
        setDay(resp[10].minAge)
        setTag(resp[11].tag)
      })
  }

  const reverseDetail = [...data].reverse()


  function removeData(id) {
    fetch(`http://localhost:2000/api/package/deletePackage/${id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        showDetail()
        handleClick()
      })
    })
  }


  function selectList(id) {
    console.log(data[id])
    setShow(data[id])
    let item = data[id]
    setId(item._id)
    setName(item.name)
    // setTag(item.tag)
    setImage(item.image)
    setDestination(item.destination)
    setDescription(item.description)
    setLongDescription(item.longDescription)
    setDuration(item.duration)
    setPrice(item.price)
    setDay(item.day)
    setDate(item.date)
  }

  async function updateDetail() {
    console.log(day)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      formData.append('tag', tag)
      formData.append('description', description)
      formData.append('duration', duration)
      formData.append('price', price)
      formData.append('longDescription', longDescription)
      formData.append('day', day)
      formData.append('date', date)
      const response = await fetch(`http://localhost:2000/api/package/updatePackage/${_id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      }).then((result) => {
        console.log("data has been updated", result)
        showDetail()
        handleClick()
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
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
              <th>Destination</th>
              <th>Duration</th>
              <th>Day</th>
              <th>Categories</th>
              <th>MinAge</th>
              <th>Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) =>
                <tr>
                  <td>{i + 1}</td>
                  <td width="150px">
                    {/* <img height="50px" src={`http://localhost:2000/${item.imageUrl}`} /> */}
                    {item.imageUrl && <img width="50px" src={item.imageUrl} alt="Uploaded" />}
                  </td>
                  <td>{item.name} </td>
                  <td>{item.destination} </td>
                  <td>{item.duration}</td>
                  <td>{item.day}</td>
                  <td> {item.tag}</td>
                  <td> {item.minAge}</td>
                  <td> {item.date}</td>
                  <td> {item.price}</td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={() => selectList(i)}>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={() => removeData(item._id)}>
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

        <Modal
          isOpen={show}
          toggle={() => setShow(!show)}
          className='modal-dialog-centered'
          onClosed={() => setCardType('')}
        >
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <ModalBody className='px-sm-5 mx-50 pb-5'>
            <h1 className='text-center mb-1'>Update package</h1>
            <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
              <Col xs={12}>
                <Label className='form-label' for='credit-card'>
                  Name
                </Label>
                <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label'>
                  Image
                </Label>
                <Input type="file" onChange={(e) => {  (e.target.files[0]) }} />
              </Col>
              {/* <Col md={12}>
                <Label className='form-label'>
                  Destination
                </Label>
                <Input placeholder='Destination' value={destination} onChange={(e) => setDestination(e.target.value)} />
              </Col> */}
              <Col md={12}>
                <Label className='form-label' >
                  Description
                </Label>
                <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  Duration
                </Label>
                <Input placeholder='Duration' value={duration} onChange={(e) => setDuration(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  Price
                </Label>
                <Input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  LongDescription
                </Label>
                <Input placeholder='LongDescription' value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  Day
                </Label>
                <Input placeholder='day ' value={day} onChange={(e) => setDay(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  Categories
                </Label>
                <Input placeholder='categories ' value={tag} onChange={(e) => setTag(e.target.value)} />
              </Col>
              {/* <Col md={12}>
                <Label className='form-label' >
                  MaxPeople
                </Label>
                <Input placeholder='maxPeople' value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} />
              </Col>
              <Col md={12}>
                <Label className='form-label' >
                  minAge
                </Label>
                <Input placeholder='maxPeople' value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} />
              </Col> */}
              <Col md={12}>
                <Label className='form-label' >
                  Date
                </Label>
                <Input type="date" placeholder='date ' value={date} onChange={(e) => setDate(e.target.value)} />
              </Col>
              <Col className='text-center mt-1' xs={12}>
                <Button type='submit' className='me-1' color='success' onClick={updateDetail}>
                  Submit
                </Button>
                <Button
                  color='secondary'
                  outline
                  onClick={() => {
                    setShow(!show)
                    reset()
                  }}
                >
                  Cancel
                </Button >
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <AddNewModal open={modal} handleModal={handleModal} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default SecondPage;
