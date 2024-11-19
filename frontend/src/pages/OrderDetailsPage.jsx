import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useOrderStore from '../stores/useOrderStore';


const OrderDetailsPage = () => {
    const {orderId} = useParams()
    const {orderDetails, getOrderDetails} = useOrderStore()
    
    useEffect(()=>{
        getOrderDetails(orderId)
    },[getOrderDetails, orderId])

 return (
    <>{orderDetails?.products.map((product)=>(
		<div key={product.productId._id} className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
			<div className='space-y-0 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded object-cover' src={product.productId.image} />
				</div>
				<label className='sr-only'>Quantity:</label>

				<div className='space-x-4 flex items-center justify-end md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<p>{product.quantity}</p>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-emerald-400'>₦{product.price}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md'>
					<p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
						{product.productId.name}
					</p>
					<p className='text-sm text-gray-400'>{product.productId.description}</p>

                </div>
            </div>
		</div>
    ))}
    </>
 )
}

export default OrderDetailsPage
