import {create} from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

const useOrderStore = create((set, get) =>({
    ordersList: null,
    orderDetails: null,
    loading: false,

    getAllOrders: async()=>{
        set({loading: true})

        try {
            const response = await axiosInstance.get('/orders')
            set({ordersList: response.data.orders})
        } catch (error) {
            toast.error(error.response.data.message || 'Error Fetching Orders')
        }finally{
            set({loading : false})
        }
    },
    getOrderDetails: async(id)=>{
        set({loading: true})
        
        try {
            const response = await axiosInstance.get(`/orders/${id}`)
            set({orderDetails: response.data.order})
        } catch (error) {
            toast.error(error.response.data.message || 'Error Fetching Order Details')
        }finally{
            set({loading: false})
        }
    },
    togglePaymentStatus: async(id)=>{
        if(!window.confirm('Are You Sure You Want To Update Payment Status')) return
        try {
            const response = await axiosInstance.patch(`/orders/${id}`)
            console.log('status',response.data.status)

            set((prevOrders) => ({
				ordersList: prevOrders.ordersList.map((order) =>
					order._id === id ? { ...order, status: response.data.status } : order
				)
			}));
        } catch (error) {
            toast.error(error.response.data.message || 'Try Again')
        }
    },
    toggleDeliveryStatus: async(id)=>{
        if(!window.confirm('Are You Sure You Want To Update Delivery Status')) return
        try {
            const response = await axiosInstance.patch(`/orders/delivery/${id}`)

            set((prevOrders) => ({
				ordersList: prevOrders.ordersList.map((order) =>
					order._id === id ? { ...order, isDelivered: response.data.isDelivered } : order
				)
			}));
        } catch (error) {
            toast.error(error.response.data.message || 'Try Again')
        }
    },

    deleteOrder: async(id)=>{
        if(!window.confirm('Are You Sure You Want To Delete Order')) return
        set({loading: true})
		try {
			await axiosInstance.delete(`/orders/${id}`);
			set((prevOrders) => ({
				ordersList: prevOrders.ordersList.filter((order) => order._id !== id),
			}));
            toast.success('Order Deleted Sucessfully')
		} catch (error) {
			toast.error(error.response.data.error || "Failed to delete order");
		}finally{
            set({loading: false})
        }
    }
}))

export default useOrderStore