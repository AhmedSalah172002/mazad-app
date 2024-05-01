import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'

const GetCategoryHook = () => {
    const disptach = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await disptach(getAllCategory());
            setLoading(false)
        }
        get();
    }, [])

    const res = useSelector(state => state.categoryReducer.allCategory)
  

    return [res]
}


export default GetCategoryHook
