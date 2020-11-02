import React,{useState} from 'react'
import styled from 'styled-components'
import Modal from 'react-modal';
import {useForm} from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import Select from 'react-select'
// -----Redux--------
import {useDispatch} from 'react-redux'
import {newProduct,updateProduct} from './Product.slice'
import {NEW,EDIT,MODULE_NAME} from './Product.constants'
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
        width:'450px',
        height:'580px',
        top: '1vh',
        bottom: '15vh',
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

const ProductModal = ({openModal,setOpenModal,modalMode,modalData,setModalData}) => {
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
            dispatch(newProduct(formData))
        }
        else if(modalMode===EDIT){
            dispatch(updateProduct({id:modalData.id,data:formData}))
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
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                        size='small'
                    />
                    <TextField
                        variant='outlined'
                        name='model'
                        label='Model'
                        defaultValue={modalMode===NEW?'':modalData.model}
                        placeholder='Model'
                        size='small'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='category'
                        label='Category'
                        defaultValue={modalMode===NEW?'':modalData.category.name}
                        placeholder='Category'
                        size='small'
                        type='number'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='manufacturer'
                        label='Manufacturer'
                        defaultValue={modalMode===NEW?'':modalData.manufacturer}
                        placeholder='Manufacturer'
                        size='small'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='hsn_code'
                        label='HSN Code'
                        defaultValue={modalMode===NEW?'':modalData.hsn_code}
                        placeholder='HSN Code'
                        type='number'
                        size='small'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='unit_of_measurement'
                        label='Unit of Measurement'
                        defaultValue={modalMode===NEW?'':modalData.unit_of_measurement}
                        placeholder='Unit of Measurement'
                        size='small'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
                    />
                    <TextField
                        variant='outlined'
                        name='remarks'
                        label='Remarks'
                        defaultValue={modalMode===NEW?'':modalData.remarks}                        
                        placeholder='Remarks'
                        size='small'
                        inputRef={register}
                        style={{width:'400px',paddingBottom:'1.3vh'}}
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

export default ProductModal