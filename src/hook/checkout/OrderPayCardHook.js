import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrderCARD } from '../../redux/actions/checkoutAction';
import notify from '../useNotifaction';
import GetLoggedCartHook from '../cart/GetLoggedCartHook';



const OrderPayCardHook = (addressDetalis) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [res] = GetLoggedCartHook()

    //when user click
    const handelCreateOrderCARD = async () => {
        if (res === '0') {
            notify("من فضلك اضف منتجات الى العربه اولا", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("من فضلك اختر عنوان اولا", "warn")
            return
        }
        setLoading(true)
        await dispatch(createOrderCARD(res?.data._id, {
            shippingAddress: {
                details: addressDetalis.details,
                phone: addressDetalis.phone,
                city: addressDetalis.city,
            }
        }))
        setLoading(false)
    }



    const resOrderCard = useSelector(state => state.checkoutReducer.createOrderCard)
    useEffect(() => {
        if (loading === false) {
            if (resOrderCard && resOrderCard.status === "success") {
                if (resOrderCard.session.url) {
                    window.open(resOrderCard.session.url)
                }
            } else {
                notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
            }
        }
    }, [loading])


    return [handelCreateOrderCARD]


}

export default OrderPayCardHook