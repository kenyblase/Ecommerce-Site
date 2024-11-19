import { motion } from "framer-motion";
import { Trash, Star, Check } from "lucide-react";
import  useOrderStore  from "../stores/useOrderStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
	const { ordersList, deleteOrder, togglePaymentStatus, toggleDeliveryStatus, getAllOrders  } = useOrderStore();

	useEffect(()=>{
		getAllOrders()
	},[getAllOrders])

	const formatdate =(dateString)=>{
		const date = new Date(dateString)

		const year = date.getFullYear()
		const month = String(date.getMonth()+1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')

		return `${year}-${month}-${day}`

	}
	const navigate = useNavigate()

	const displayOrderDetails=(orderId)=>{
		navigate(`/order-details/${orderId}`)
	}

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='overflow-x-auto md:overflow-hidden'>

				<table className=' min-w-full sm:max-w-full divide-y divide-gray-700'>
					<thead className='bg-gray-700'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Email Address
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Date
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Payment Status
							</th>

							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Delivered
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Delete
							</th>
						</tr>
					</thead>

					<tbody className='bg-gray-800 divide-y divide-gray-700'>
						{ordersList?.map((order) => (
							<tr key={order._id} className='hover:bg-gray-700'
							onClick={()=>displayOrderDetails(order._id)}>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='ml-0'>
											<div className='text-sm font-medium text-white'>{order.user.email}</div>
										</div>
									</div>
								</td>
								<td className='px-3 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{formatdate(order.createdAt)}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => togglePaymentStatus(order._id)}
										className={`p-1 rounded-full ml-4 ${
											order.status ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
										} hover:bg-yellow-500 transition-colors duration-200`}
									>
										<Check className='h-5 w-5' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleDeliveryStatus(order._id)}
										className={`p-1 rounded-full ml-4 ${
											order.isDelivered ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
										} hover:bg-yellow-500 transition-colors duration-200`}
									>
										<Star className='h-5 w-5' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
									<button
										onClick={() => deleteOrder(order._id)}
										className='ml-2 text-red-400 hover:text-red-300'
									>
										<Trash className='h-5 w-5' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default OrdersList;