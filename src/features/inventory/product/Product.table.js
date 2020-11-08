import React,{useState} from 'react'
// -------redux-------
import {useSelector} from 'react-redux'
import {selectProductList} from './Product.slice'
import {selectCategoryById} from '../category/Category.slice' 
import {selectGstCodeById} from '../gstCode/GstCode.slice'
import {selectManufacturerById} from '../manufacturer/Manufacturer.slice'
import {selectUnitOfMeasurementById} from '../unitOfMeasurement/UnitOfMeasurement.slice'
import {selectCostPrices} from './ProductCostPrice.slice'
import {selectSellingPrices} from './ProductSellingPrice.slice'
import {selectMrp} from './ProductMrp.slice'
import {selectAllStock} from './ProductStock.slice'

import {EDIT} from './Product.constants'
import {ReactTable} from '../../../app/components/table/ReactTable'
import Button from '@material-ui/core/Button'



const ProductTable = ({setOpenModal,setModalMode,setModalData}) => {
    const [mrp,setMrp]=useState(0)

    
    const columns = React.useMemo(
        () => [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'name',
            accessor: 'name', // accessor is the "key" in the data
        },
        {
            Header: 'Serial No',
            accessor: 'serial_no',
            width:'20px' // accessor is the "key" in the data
        },
        {
            Header: 'Model',
            accessor: 'model', // accessor is the "key" in the data
        },
        {
            Header: 'Category',
            accessor: 'category',
            Cell:({cell:{value}})=>{
                
                const selectedCategory=useSelector(state=>selectCategoryById(state,value))
                return selectedCategory?selectedCategory.name:'null'           
                
            }
        },
        {
            Header: 'Manufacturer',
            accessor: 'manufacturer',
            Cell:({cell:{value}})=>{
                const selectedManufacturer=useSelector(state=>selectManufacturerById(state,value))                
                return selectedManufacturer?selectedManufacturer.name:'null'
            }
        },
        {
            Header: 'HSN Code',
            accessor: 'gst_code',
            Cell:({cell:{value}})=>{
                const selectedGstCode=useSelector(state=>selectGstCodeById(state,value))                  
                return selectedGstCode?selectedGstCode.code:'null'
            }
        },
        {
            Header: 'Unit of Measurement',
            accessor: 'unit_of_measurement',
            width:'10px',
            Cell:({cell:{value}})=>{
                const selectedUnitOfMeasurement=
                    useSelector(state=>selectUnitOfMeasurementById(state,value)) 
                return selectedUnitOfMeasurement?selectedUnitOfMeasurement.unit_of_measurement:'null'
                
             }
        },
        {
            Header: 'Cost Price',
            accessor: 'costPrice',
            Cell:({row})=>{
                console.log('value of row is',row.original)
                const costPrices=useSelector(selectCostPrices)
                const costPrice=costPrices.find(c=>{
                    
                    if(c.product===row.original.id){
                        return c
                    }
                    else return null
                })
                if(costPrice){
                    return costPrice.per_piece_cost_price
                }else return 0
            }
        },
        {
            Header: 'Selling Price',
            accessor: 'sellingPrice',
            Cell:({row})=>{
                console.log('value of row is',row.original)
                const sellingPrices=useSelector(selectSellingPrices)
                const sellingPrice=sellingPrices.find(c=>{
                    
                    if(c.product===row.original.id){
                        return c
                    }
                    else return null
                })
                if(sellingPrice){
                    return sellingPrice.per_piece_sell_price
                }else return 0
            }
        },
        {
            Header: 'Mrp',
            accessor: 'mrp',
            Cell:({row})=>{
                console.log('value of row is',row.original)
                const mrps=useSelector(selectMrp)
                const mrp=mrps.find(c=>{
                    
                    if(c.product===row.original.id){
                        return c
                    }
                    else return null
                })
                if(mrp){
                    setMrp(mrp.amount)
                    return mrp.amount
                }else return 0
            }
        },
        {
            Header: 'Stock',
            accessor: 'stock',
            Cell:({row})=>{
                console.log('value of row is',row.original)
                const stocks=useSelector(selectAllStock)
                const stock=stocks.find(c=>{
                    
                    if(c.product===row.original.id){
                        return c
                    }
                    else return null
                })
                if(stock){
                    return stock.quantity
                }else return 0
            }
        },         
        {
            Header: 'Remarks',
            accessor: 'remarks',
        },
        {
            Header: "Status",
            accessor: "active",
            width:400,
            Cell: ({ cell: { value } }) => {
                if (value === true) {
                    return 'active'
                } else {
                    return 'in-active'
                }

            }
        },
        {
            //    id:'selection',
               Header:'Action',
               Cell:({row})=>{
                   console.log('mrp--table',mrp)
                const payload={
                    ...row.original,
                    mrp
                }
                return(
                    <Button 
                        variant='contained'
                        color='primary'
                        onClick={()=>{
                        setModalMode(EDIT)
                        setOpenModal(true)
                        setModalData(payload)
                    }}>
                        Edit</Button>
                    // <ActionButton row={row.original} />
                )
            }
    
            },
        ],
        [setModalData,setOpenModal,setModalMode]
      )
    // ---Redux
   
    const productList=useSelector(selectProductList)    
   
    return (
        <>
            {
                productList?
                <div>
                    <ReactTable columns={columns} data={productList}/>
                </div>:null
            }
        </>
       
    )
}

export default ProductTable

