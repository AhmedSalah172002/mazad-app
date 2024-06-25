import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrderCARD } from '../../redux/actions/checkoutAction';
import notify from '../useNotifaction';

const OrderPayCardHook = (addressDetalis,cartId) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    //when user click
    const handelCreateOrderCARD = async () => {
        setLoading(true)
        await dispatch(createOrderCARD(cartId, {
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