import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkInsurancePayment } from '../../redux/actions/checkoutAction';
import notify from '../useNotifaction';

const CheckInsurancePaymentHook = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

       //when user click
       const handelCheckInsurancePayment = async (productId) => {
        setLoading(true)
        await dispatch(checkInsurancePayment(productId))
        setLoading(false)
    }



    const insurancePayment = useSelector(state => state.checkoutReducer.checkInsurancePayment)
    useEffect(() => {
        if (loading === false) {
            if (insurancePayment && insurancePayment.status === "success") {
                if (insurancePayment.session.url) {
                    window.open(insurancePayment.session.url)
                }
            } else {
                notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
            }
        }
    }, [loading])

    return [handelCheckInsurancePayment , loading]
 
}

export default CheckInsurancePaymentHook
