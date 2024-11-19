import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import useCartStore from '../stores/useCartStore'
import { Loader, ShoppingBag } from 'lucide-react'
import axiosInstance from '../lib/axios'

const BankDetailsCard = ({bankDetails}) => {
	const {cart, clearCart, total} = useCartStore()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
  const createOrder = async()=>{
	setLoading(true)
	try {
		const res = await axiosInstance.post("/payments/checkout-success", {products: cart, totalAmount:total});
		navigate(`/order-success/${res.data.orderId}`, {replace: true})
		clearCart()
		window.location.reload()
	} catch (error) {
		console.log(error)
	}finally{
		setLoading(false)
	}
  }
  return (
    <motion.div
    className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Bank Details</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Account Name</dt>
						<dd className='text-base font-medium text-white'>{bankDetails?.accountName}</dd>
					</dl>

					 
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Account Number</dt>
							<dd className='text-base font-medium text-emerald-400'>{bankDetails?.accountNumber}</dd>
						</dl>
					
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Bank Name</dt>
						<dd className='text-base font-bold text-emerald-400'>{bankDetails?.bankName}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={createOrder}
					disabled={loading}
				>
					{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<ShoppingBag className='mr-2 h-5 w-5' aria-hidden='true' />
									Create Order
								</>
							)}
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-md font-normal text-emerald-400'>Click Once Transaction Is Completed</span>
				</div>
			</div>
		</motion.div>
	);
}

export default BankDetailsCard
