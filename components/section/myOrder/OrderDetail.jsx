/* This example requires Tailwind CSS v2.0+ */
import { Container } from '@/components/common'
import { useForm, Controller } from "react-hook-form";
import { orderApi } from '@/apiClient/order';
import { useState, useEffect } from 'react'
import Link from 'next/link';
// import { ProgressCart } from './ProgressCart';
import { HiOutlineX } from "react-icons/hi";
import { useRouter } from 'next/router'
import { ProcessOrder } from './ProcessOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function OrderDetail() {
    const router = useRouter()
    const [dataOrder, setDataOrder] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [idOrder, setIdOrder] = useState()
    const [stateOrder, setStateOrder] = useState()
    // const [confirm, se] = useState()

    useEffect(() => {
        try {
            const fetchCart = async () => {
                const data = await orderApi.getOrderDetail(router.query.slug);
                setDataOrder(data)
                let total = 0
                data.map((item) => total += item.quantity * item.price)
                setSubTotal(total)
            };
            const fetchOrder = async () => {

                const getOrder = await orderApi.getAllOrder();
                getOrder.map((item) => {
                    if (item._id === parseInt(router.query.slug)) {
                        setStateOrder(item.status)
                    }
                })
            };
            fetchOrder()
            fetchCart();
        } catch (error) {
            return toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [stateOrder]);
    const fetchConfirmOrder = async () => {
        try {
            await orderApi.confirmOrder(router.query.slug)
            setStateOrder(3)
            return toast.success('Confirm successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });

        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const fetchDeleteOrder = async () => {
        try {
            await orderApi.deleteOrder(router.query.slug)
            toast.success('Cancel successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => {
                router.push('/my-orders')
            }, 1500);
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <Container>
            <ProcessOrder status={stateOrder} />
            <div className='hidden md:block w-full mb-10'>
                <div className='w-full bg-[#f0f0f0] py-3 font-semibold text-base rounded-3xl items-center justify-center uppercase grid grid-cols-12 mb-6 shadow-lg'>
                    <div className='text-center col-span-5'>
                        <span>PRODUCT DETAILS</span>
                    </div>
                    <div className='text-center col-span-1'>
                        <span>PRICE</span>
                    </div>
                    <div className='text-center col-span-1'>
                        <span>SIZE</span>
                    </div>
                    <div className='text-center col-span-2'>
                        <span>QUANTITY</span>
                    </div>
                    <div className='col-span-1  text-center'>
                        <span>TOTAL</span>
                    </div>
                </div>
                {dataOrder.length > 0 ?
                    dataOrder.map((item, index) => {
                        return (
                            <div key={index} className='w-full text-sm grid grid-cols-12  border border-b-2 shadow-lg rounded-lg hover:bg-zinc-100 duration-500 py-1 mb-2'>
                                <div className=' font-medium col-span-5 flex justify-start items-center py-2 pl-2'>
                                    <img src={`http://localhost:3010/upload/${item.image}`} className='w-20 h-20 object-cover' />
                                    <div className='ml-2'>
                                        <span>{item.productName}</span>
                                    </div>
                                </div>
                                <div className='text-center col-span-1 flex justify-center items-center'>
                                    <span>${item.price}</span>
                                </div>
                                <div className='text-center col-span-1 flex justify-center items-center'>
                                    <span>{item.size}</span>
                                </div>
                                <div className='text-center col-span-2 flex justify-center items-center'>
                                    {/* <FormQuantity quantity={item.quantity} cartId={item._id} productId={item.productId} size={item.size} /> */}
                                    <span> {item.quantity}</span>
                                </div>
                                <div className='col-span-1  text-center flex justify-center items-center'>
                                    <span>${item.quantity * item.price}</span>
                                </div>
                            </div>
                        )
                    }) :
                    <div className='w-full text-sm border border-b-2 shadow-lg rounded-lg text-center duration-500 py-10 mb-2'>No data</div>
                }

            </div>
            <div className='w-full px-4 my-32 md:hidden'>
                {dataOrder.length > 0 ?
                    dataOrder.map((item, index) => {
                        return (
                            <div key={index} className='w-full grid grid-cols-12 mb-5 shadow-lg rounded-lg py-2'>
                                <div className='w-full flex items-center col-span-4'>
                                    <img src={`http://localhost:3010/upload/${item.image}`} className='w-30 h-30 object-cover p-2 ' />
                                </div>

                                <div className='col-span-6 px-2'>
                                    <div className='w-full font-bold '>
                                        <span>Name: {item.productName}</span>
                                    </div>
                                    <div className='w-full font-bold text-red-500'>
                                        <span>Price: ${item.price}</span>
                                    </div>
                                    <div className='w-full font-bold '>
                                        <span>Size: {item.size}</span>
                                    </div>
                                    <div className='w-full'>
                                        {/* <FormQuantity quantity={item.quantity} cartId={item._id} productId={item.productId} size={item.size} /> */}
                                        <span> {item.quantity}</span>
                                    </div>
                                    <div className='w-full font-bold'>
                                        <span>Total: ${item.quantity * item.price}</span>
                                    </div>
                                </div>
                                <div className='col-span-2 flex justify-center items-center'>
                                    <button
                                        className='w-10 h-10 cursor-pointer'
                                        onClick={() => handleDeleteItemCart(item._id)}
                                    >
                                        <div className='w-8 h-8 border border-2 border-[#c5c3c3] shadow-lg font-bold hover:bg-red-500 hover:text-white flex justify-center items-center duration-500 rounded-full'>
                                            <HiOutlineX />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className='w-full text-center shadow-lg rounded-lg py-10'>No data</div>

                }
            </div>
            <div className='w-full grid grid-cols-12 '>
                <div className='md:col-span-8'></div>
                <div className='col-span-12 md:col-span-4 w-full shadow-lg'>
                    <div className='w-full bg-slate-200 p-4  rounded-lg '>
                        <div className='w-full mb-2 flex'>
                            <span className='w-[30%] flex justify-end'>Subtotal: </span>
                            <p className='w-[60%] pl-10'>$ {subTotal}</p>
                        </div>
                        <div className='w-full mb-2 flex'>
                            <span className='w-[30%] flex justify-end'>Delivery: </span>
                            <p className='w-[60%] pl-10'>$ 0</p>
                        </div>
                        <div className='border border-[0.5px] border-[#898787] w-full'></div>
                        <div className='w-full mb-2 flex'>
                            <span className='w-[30%] flex justify-end'>Total: </span>
                            <p className='w-[60%] pl-10'>$ {subTotal}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full my-10 flex justify-center items-center'>
                {
                    stateOrder === 0 ?
                        <button
                            className='w-1/2 md:w-1/6 py-2 rounded-2xl bg-slate-400 cursor-pointer hover:bg-red-400 font-bold duration-500 hover:text-white'
                            onClick={fetchDeleteOrder}
                        >
                            Cancel
                        </button>
                        : stateOrder === 2 ?
                            <button
                                className='w-1/2 md:w-1/6 py-2 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white'
                                onClick={fetchConfirmOrder}
                            >
                                Confirm
                            </button>
                            : null
                }


            </div>
            <ToastContainer />
        </Container>
    )

}
