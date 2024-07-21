// ** React Imports
import { useState } from 'react'
import axios from 'axios'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { ToastContainer } from 'react-toastify'
import { handleClick } from './tosti'

const AddNewModal = ({ open, handleModal }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [longDescription, setLongDescription] = useState("")
  const [day, setDay] = useState("")
  const [maxPeople, setMaxPeople] = useState("")
  const [minAge, setMinAge] = useState("")
  const [tag, setTag] = useState("")
  const [date, setDate] = useState("")


  // function addDetail() {
  //   const data = { name, image, destination, duration, description, price }
  //   fetch("http://localhost:2000/api/package/addPackage", {
  //     method: "POST",
  //     headers: {
  //       'Accept': "application/json",
  //       'Content-Type': "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   }).then((result) => {
  //     console.log(result)
  //   })
  // }




  const addDetail = async (e) => {
    console.warn('Before FormData:', image);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('destination', destination);
      formData.append('duration', duration);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('longDescription', longDescription);
      formData.append('day', day);
      formData.append('maxPeople', maxPeople);
      formData.append('minAge', minAge);
      formData.append('date', date);
      formData.append('tag', tag);

      console.log('After FormData:', formData);

      console.log(formData)
      const response = await axios.post('http://localhost:2000/api/package/addPackage', formData, {
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('File uploaded successfully:', response.data);
      handleClick()

    } catch (error) {
      console.error('Error uploading file:', error);
    }
    window.location.href = '/packages';
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
              Name
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <User size={15} />
            </InputGroupText> */}
              <Input id='full-name' placeholder='The place of heaven' onChange={(e) => { setName(e.target.value) }} required />
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
              <Input id='image' type='file' onChange={(e) => { setImage(e.target.files[0]) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='post'>
              Destination
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Briefcase size={15} />
            </InputGroupText> */}
              <Input id='post' placeholder='Kedarnath' onChange={(e) => { setDestination(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='email '>
              Description
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Mail size={15} />
            </InputGroupText> */}
              <Input id='description' placeholder='this is description' onChange={(e) => { setDescription(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='joining-date'>
              Duraction
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input id='duraction' placeholder='0 day | 0 day' onChange={(e) => { setDuration(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='salary'>
              Price
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <DollarSign size={15} />
            </InputGroupText> */}
              <Input type='number' id='Price' onChange={(e) => { setPrice(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              LongDescription
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <DollarSign size={15} />
            </InputGroupText> */}
              <Input type='text' id='LongDescription' onChange={(e) => { setLongDescription(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              Day
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input id='day' type='number' placeholder='2' onChange={(e) => { setDay(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              MaxPeople
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input type='number' placeholder='15' onChange={(e) => { setMaxPeople(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              MinAge
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input type='number' placeholder='10' onChange={(e) => { setMinAge(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              Date
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input type='date' placeholder='date' onChange={(e) => { setDate(e.target.value) }} required />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label'>
              Tag
            </Label>
            <InputGroup>
              {/* <InputGroupText>
              <Calendar size={15} />
            </InputGroupText> */}
              {/* <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} /> */}
              <Input type='text' placeholder='any tag' onChange={(e) => { setTag(e.target.value) }} required />
            </InputGroup>
          </div>
          <Button className='me-1' color='success' onClick={addDetail} >
            <div >Submit</div>
          </Button>
          <Button color='secondary' onClick={handleModal} outline>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
      <ToastContainer/>
    </div>
  )
}

export default AddNewModal
