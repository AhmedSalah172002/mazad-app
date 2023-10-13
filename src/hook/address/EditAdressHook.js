import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editUserAddress, getOneUserAddress } from '../../redux/actions/addressAction';
import notify from '../useNotifaction';

const EditAdressHook = (id) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
    const [loadingEdit, setLoadingEdit] = useState(true);
    const [alias, setAlias] = useState('')
    const [detalis, setDetalis] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')


    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value)
    }
    const onChangeCity = (event) => {
        event.persist();
        setCity(event.target.value)

    }
    const onChangeDetalis = (event) => {
        event.persist();
        setDetalis(event.target.value)

    }

    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)

    }

console.log(id);
    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getOneUserAddress(id))
            setLoading(false)
        }
        get();
    }, [])

    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress)

    console.log(resAddress);
    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress.status === "success") {
                setAlias(resAddress.data.alias)
                setDetalis(resAddress.data.details)
                setPhone(resAddress.data.phone)
            }
        }
    }, [loading])

    const handelEdit = async () => {
        setLoadingEdit(true)
        await dispatch(editUserAddress(id, {
            alias,
            details: detalis,
            phone,
            city
        }))
        setLoadingEdit(false)

    }
    const resEdit = useSelector(state => state.userAddressesReducer.editAddress)
    useEffect(() => {

        if (loadingEdit === false) {
            if (resEdit && resEdit.status === 200) {
                notify("تمت عملية التعديل بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                notify("فشل فى عملية التعديل", "error")
            }
        }
    }, [loadingEdit])

    return [handelEdit, alias, detalis, phone,city, onChangeAlias,onChangeCity, onChangeDetalis, onChangePhone]
}

export default EditAdressHook
