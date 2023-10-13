import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotifaction';
import { createNewUser } from '../../redux/actions/authAction';
import { useEffect } from 'react';

const SignupHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('user')
    const [loading, setLoading] = useState(true)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeRole = (e) => {
        setRole(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

 

    const res = useSelector(state => state.authReducer.createUser)

    //save data
    const OnSubmit = async () => {
        setLoading(true)
        await dispatch(createNewUser({
            name,
            email,
            password,
            passwordConfirm: confirmPassword,
            phone,
            role
        }))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.data.token) {
                    notify("تم تسجيل الحساب بنجاح", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }

                if (res.data.errors) {
                        notify(res.data.errors[0].msg, "error")
                }
            }
        }
    }, [loading])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword,onChangeRole, OnSubmit]
}

export default SignupHook
