import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import notify from '../useNotifaction'
import { addUserAddress } from '../../redux/actions/addressAction'
import { useNavigate } from 'react-router-dom'

const AddAddressHook = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alias, setAlias] = useState('')
    const [city, setCity] = useState('')
    const [detalis, setDetalis] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)


    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value)
    }

    const onChangeDetalis = (event) => {
        event.persist();
        setDetalis(event.target.value)

    }

    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)

    }
    const onChangeCity = (event) => {
        event.persist();
        setCity(event.target.value)

    }
    const onSubmit = async () => {
       
        setLoading(true)
        await dispatch(addUserAddress({
            alias: alias,
            details: detalis,
            phone: phone,
            city: city,
        }))
        setLoading(false)
    }
    const res = useSelector(state => state.userAddressesReducer.addUserAddress)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت اضافة العنوان بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);


            } else {
                notify("هناك مشكله فى عملية الاضافة ", "error")
            }

        }

    }, [loading])



    return [alias, detalis, phone,city, onChangeAlias,onChangeCity, onChangeDetalis, onChangePhone, onSubmit]
}

export default AddAddressHook
