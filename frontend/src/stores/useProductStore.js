import {create} from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

const useProductStore = create((set)=>({
    products: [], 
    loading: false,

    setProducts: (products)=> set({products}),

    createProduct: async (productData)=>{
        set({loading: true})
        try {
            const response = await axiosInstance.post('/product', productData)
            set((prevState)=>({
                products: [...prevState.products, response.data]
            }))
            toast.success('Product Created Successfully')
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({loading: false})
        }
    },

    fetchAllProducts: async()=>{
        set({ loading: true });
		try {
			const response = await axiosInstance.get("/product");
			set({ products: response.data.products});
		} catch (error) {
			set({ error: "Failed to fetch products"});
			toast.error(error.response.data.error || "Failed to fetch products");
		}finally{
            set({loading: false})
        }
    },
    fetchProductsByCategory: async(category)=>{
        set({loading: true})
        try {
            const response = await axiosInstance.get(`/product/category/${category}`)
            set({products: response.data.products})
        } catch (error) {
            toast.error('Failed To Fetch Products Of This Category')
        }finally{
            set({loading: false})
        }
    },
    deleteProduct: async (productId) => {
		if(!window.confirm('Are You Sure You Want To Delete Order')) return
		set({ loading: true });
		try {
			await axiosInstance.delete(`/product/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
    toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.patch(`/product/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/product/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}))

export default useProductStore