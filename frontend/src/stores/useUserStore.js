import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import {toast} from 'react-hot-toast'

const useUserStore = create((set, get)=>({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async({name, email, password, confirmPassword})=>{
        set({loading: true})

        if(password !== confirmPassword){
            set({loading: false})
            return toast.error('Passwords Do Not Match')
        }

        try {
            const response = await axiosInstance.post('/auth/signup', {name, email, password})
            console.log(response)
            set({user: response.data.newUser})
            toast.success('Account Created Successfully')
        } catch (error) {
            toast.error(error.response.data.message || 'Something Went Wrong')
        }finally{
            set({loading: false})
        }
    },

    login: async(email, password)=>{
        set({loading: true})

        try {
            const response = await axiosInstance.post('/auth/login', {email, password})
            set({user: response.data.user})
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message || 'Something Went Wrong')
        }finally{
            set({loading: false})
        }
    },

    logout: async()=>{
        set({loading: true})
        try {
            const response = await axiosInstance.post('/auth/logout')
            set({user: null})
            toast.success(response.data.message || 'logged out sucessfully')
        } catch (error) {
            toast.error(error.response.data.message || 'Error Logging Out')
        }finally{
            set({loading: false})
        }
    },

    checkAuth: async()=>{
        set({checkingAuth: true})

        try {
            const response = await axiosInstance.get('/auth/profile')
            set({user: response.data})
        } catch (error) {
            set({user: null})
        }finally{
            set({checkingAuth: false})
        }
    }
}))

export default useUserStore