import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneProduct, updateProducts } from '../../redux/actions/productsAction'
import notify from '../useNotifaction'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProductHook = (id) => {
    let auth
    if(localStorage.getItem("user") !== null){
      auth = JSON.parse(localStorage.getItem("user"))
    }
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        
        dispatch(getOneProduct(id))
    },[])

    const Product = useSelector((state) => state.allproducts.oneProduct);
    let item = [];
    try {
        if (Product.data)
            item = Product.data
        else
            item = []
    } catch (e) {
        console.log(e);
     }

     const [img, setImg] = useState("")
     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [InitialPrice, setInitialPrice] = useState('')
     const [LowestBidValue, setLowestBidValue] = useState('')
     const [BiddingStartTime, setBiddingStartTime] = useState('')
     const [selectedFile, setSelectedFile] = useState(null)
     const [loading, setLoading] = useState(true)
     const [isPress, setIsPress] = useState(false)
     useEffect(() => {
        if(item){
           
            setImg(item.image)
            setName(item.name)
            setDescription(item.description)
            setInitialPrice(item.InitialPrice)
            setLowestBidValue(item.LowestBidValue)
            setBiddingStartTime(item.BiddingStartTime)
            setSelectedFile(null)
            setLoading(true)
         }
     },[item])
     

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
            console.log(URL.createObjectURL(event.target.files[0]));
             setImg(URL.createObjectURL(event.target.files[0]))
             setSelectedFile(event.target.files[0])
         }
     }
     const res = useSelector(state => state.allproducts.updateProducts)

     //save data in database
     const handelSubmit = async () => {
         const formData = new FormData();
         if(img !== item.image){
            formData.append("image", selectedFile)
         }
         formData.append("name", name)
         formData.append("description", description)
         formData.append("InitialPrice", InitialPrice)
         formData.append("LowestBidValue", LowestBidValue)
         formData.append("BiddingStartTime", BiddingStartTime)
         formData.append("Merchant", auth._id)
         setLoading(true)
         setIsPress(true)
         await dispatch(updateProducts(id,formData))
         setLoading(false)
     }
 
     useEffect(() => {
         if (loading === false) {
             setSelectedFile(null)
             setLoading(true)
             setTimeout(() => setIsPress(false), 1000)
             if (res.status === 200) {
                 notify('تمت عملية التعديل بنجاح', "success");
                 setTimeout(() => {
                    navigate("/merchant-product")
                }, 1500);
             }
             else {
                 notify('هناك مشكله فى عملية التعديل', "error");
             }
         }
     }, [loading])
 
     return [img, name,description,InitialPrice,LowestBidValue,BiddingStartTime, loading, isPress, handelSubmit, onImageChange, onChangeName,onChangeDescription,onChangeBiddingStartTime,onChangeLowestBidValue,onChangeInitialPrice]

}

export default EditProductHook
