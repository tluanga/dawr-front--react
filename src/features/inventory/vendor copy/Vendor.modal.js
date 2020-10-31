import React,{useState} from 'react'
import styled from 'styled-components'
import Modal from 'react-modal';
import {useForm} from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import Select from 'react-select'
// -----Redux--------
import {useDispatch} from 'react-redux'
import {newVendor,updateVendor} from './Vendor.slice'
import {NEW,EDIT,MODULE_NAME} from './Vendor.constants'
import {AiOutlineClose} from 'react-icons/ai'
import {MdClearAll} from 'react-icons/md'
import {CgPushChevronUpO} from 'react-icons/cg'



const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: { 
        position: 'absolute',
        width:'35vw',
        height:'95vh',
        top: '2.5vh',
        bottom: '2.5vh',
        left: '32.5vw',
        right: '32.5vw',        
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '5px'
      }
  };

const Wrapper=styled.section`
    display:flex;
    justify-content:center;
    align-items:center;
  `
const Form=styled.form`
    display:flex;
    flex-direction:column ;
  `
const Control=styled.section`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    padding-top:5vh;
  `

Modal.setAppElement('#root')

const VendorModal = ({openModal,setOpenModal,modalMode,modalData,setModalData}) => {
    const [status,setStatus]=useState()
    const statusOption=[
        {
            label:'Active',
            value:true
        },
        {
            label:'In Active',
            value:false
        }
    ]
    const dispatch=useDispatch()
    const {handleSubmit,register,reset}=useForm()
    
    const onSubmit=formData=>{
        formData.active=status
        setOpenModal(false)
        if(modalMode===NEW){
            dispatch(newVendor(formData))
        }
        else if(modalMode===EDIT){
            dispatch(updateVendor({id:modalData.id,data:formData}))
            setModalData({})
        }
        
    }

    const onReset=()=>{
        if(modalMode===NEW){
            reset({
                name:'',
                address:'',
                mobile:null,
                email:'',
                pincode:null,
                gst_no:'',
                remarks:'',
                active:''
            })
        }        
        
    }

   
  
 

    return(       
        <Modal
            isOpen={openModal}
            onRequestClose={()=>setOpenModal(false)}
            style={customStyles}
        >
            <Wrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {modalMode===NEW?
                        <p>New {MODULE_NAME} </p>
                        :<p>Edit {MODULE_NAME}</p>
                    }
                    <TextField
                        variant='outlined'
                        name='name'
                        label='Name'
                        defaultValue={modalMode===EDIT?modalData.name:''}
                        placeholder='Name'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                        size='small'
                    />
                    <TextField
                        variant='outlined'
                        name='address'
                        label='Address'
                        defaultValue={modalMode===NEW?'':modalData.address}
                        placeholder='Address'
                        multiline
                        rows={4}
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='mobile'
                        label='Mobile No'
                        defaultValue={modalMode===NEW?'':modalData.mobile}
                        placeholder='Mobile No'
                        size='small'
                        type='number'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='email'
                        label='Email'
                        defaultValue={modalMode===NEW?'':modalData.email}
                        placeholder='email'
                        type='email'
                        size='small'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='pincode'
                        label='Pin Code'
                        defaultValue={modalMode===NEW?'':modalData.pincode}
                        placeholder='Pin Code'
                        type='number'
                        size='small'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='gst_no'
                        label='Gst Number'
                        defaultValue={modalMode===NEW?'':modalData.gst_no}
                        placeholder='Gst Number'
                        size='small'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='remarks'
                        label='Remarks'
                        defaultValue={modalMode===NEW?'':modalData.remarks}                        
                        placeholder='Remarks'
                        size='small'
                        inputRef={register}
                        style={{width:'30vw',paddingBottom:'1.3vh'}}
                    />
                    <Select
                        defaultValue={modalData.active===true?statusOption[0]:statusOption[1]}
                        options={statusOption}
                        onChange={data=>setStatus(data.value)}
                    />
                    <Control>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            startIcon={<CgPushChevronUpO/>}
                        >Submit</Button>
                        {
                            modalMode===NEW?
                            <Button
                            variant='contained'
                            color='primary'
                            type='button'
                            startIcon={<MdClearAll/>}
                            onClick={onReset}
                            >Clear</Button>:null
                        }
                        
                        <Button
                            variant='contained'
                            color='secondary'
                            type='button'
                            startIcon={<AiOutlineClose/>}
                            onClick={()=>{
                                setOpenModal(false)
                                setModalData({})
                            }}
                        >Cancel</Button>

                    </Control>
                </Form>                
            </Wrapper>
            
        </Modal>
        
    )
}

export default VendorModal
