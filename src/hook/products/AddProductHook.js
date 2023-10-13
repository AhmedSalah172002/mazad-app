import React from 'react'
import notify from '../../hook/useNotifaction'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { createProduct } from '../../redux/actions/productsAction';
import addProduct from "../../images/add-image.png"
const AddProductHook = () => {
    let auth
    if(localStorage.getItem("user") !== null){
      auth = JSON.parse(localStorage.getItem("user"))
    }
    const dispatch = useDispatch();
     const [img, setImg] = useState(addProduct)
     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [InitialPrice, setInitialPrice] = useState('')
     const [LowestBidValue, setLowestBidValue] = useState('')
     const [BiddingStartTime, setBiddingStartTime] = useState('')
     const [selectedFile, setSelectedFile] = useState(null)
     const [loading, setLoading] = useState(true)
     const [isPress, setIsPress] = useState(false)
 
     //to change name state
     const onChangeName = (event) => {
         event.persist();
         setName(event.target.value)
     }
     const onChangeDescription = (event) => {
        event.persist();
        setDescription(event.target.value)
    }
     const onChangeInitialPrice = (event) => {
        event.persist();
        setInitialPrice(event.target.value)
    }
    const onChangeLowestBidValue = (event) => {
        event.persist();
        setLowestBidValue(event.target.value)
    }
    const onChangeBiddingStartTime = (event) => {
        event.persist();
        setBiddingStartTime(event.target.value)
    }
   
 
     //when image change save it 
     const onImageChange = (event) => {
         if (event.target.files && event.target.files[0]) {
            console.log(URL.createObjectURL(event.target.files[0]),event.target.files[0]);
             setImg(URL.createObjectURL(event.target.files[0]))
             setSelectedFile(event.target.files[0])
         }
     }
     const res = useSelector(state => state.allproducts.products)
 
     //save data in database
     const handelSubmit = async () => {
        if(img ===addProduct){
            notify('قم بتحديد صورة للمنتج', "error");
        }
         const formData = new FormData();
         formData.append("name", name)
         formData.append("image", selectedFile)
         formData.append("description", description)
         formData.append("InitialPrice", InitialPrice)
         formData.append("LowestBidValue", LowestBidValue)
         formData.append("BiddingStartTime", BiddingStartTime)
         formData.append("Merchant", auth._id)
         setLoading(true)
         setIsPress(true)
         await dispatch(createProduct(formData))
         setLoading(false)
     }
 
     useEffect(() => {
         if (loading === false) {
            
             setImg(addProduct)
             setName("")
             setDescription("")
             setInitialPrice("")
             setLowestBidValue("")
             setBiddingStartTime("")
             setSelectedFile(null)
             setLoading(true)
             
             setTimeout(() => setIsPress(false), 1000)
             if (res.status === 201) {
                 notify('تمت عملية الاضافة بنجاح', "success");
             }
             else {
               
                if (res.data.errors) {
                    notify(res.data.errors[0].msg, "error")
                }else
                 notify('هناك مشكله فى عملية الاضافة', "error");
             }
         }
     }, [loading])
 
     return [img, name,description,InitialPrice,LowestBidValue,BiddingStartTime, loading, isPress, handelSubmit, onImageChange, onChangeName,onChangeDescription,onChangeBiddingStartTime,onChangeLowestBidValue,onChangeInitialPrice]
}

export default AddProductHook
