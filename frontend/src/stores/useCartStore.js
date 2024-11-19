import {create} from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

const useCartStore = create((set, get) =>({
    cart: null,
    total: 0,
    subtotal: 0,
    bankDetails: null,

    getCartItems: async()=>{
        try {
            const response = await axiosInstance.get('/cart')
            set({cart: response.data})
            get().calculateTotals()
        } catch (error) {
            set({cart: []})
            toast.error(error.response.data.message || 'An Error Occurred')
        }
    },

    clearCart: async() => {
        try {
            const res = await axiosInstance.get('/cart/clear-cart')
            set({ cart: res.data || [], total: 0, subtotal: 0 });
        } catch (error) {
            console.log(error)
        }
    },

    addToCart: async (product) => {
		try {
			await axiosInstance.post("/cart", { productId: product._id });

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
                if(existingItem){
                    toast.success('Quantity Updated Sucessfully')
                }else{
                    toast.success('Product Added To Cart')
                }
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 }
                     : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error?.response?.data?.message || "An error occurred");
		}
	},

    removeFromCart: async(productId)=>{
        await axiosInstance.delete('/cart', {productId})
        set((prevState)=>({ cart: prevState.cart.filter(item=> item._id !== productId)}))
        get().calculateTotals()
    },

    updateQuantity: async(productId, quantity)=>{
        if(quantity === 0){
            get().removeFromCart(productId)
            return
        }

        try {
            await axiosInstance.put(`/cart/${productId}`, {quantity})
            set((prevState)=>({
                cart: prevState.cart.map(item => item._id === productId ? {...item, quantity} : item)
            }))
            get().calculateTotals()
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    },

    getBankDetails: async()=>{
        try {
            const res = await axiosInstance.get('/payments/get-details')
            set({bankDetails: res.data.bankDetails})
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    },

    calculateTotals: ()=>{
        const {cart} = get()
        const subtotal = cart.reduce((sum, item)=> sum + item.price * item.quantity, 0)
        let total = subtotal

        set({subtotal, total})
    }
}))

export default useCartStore