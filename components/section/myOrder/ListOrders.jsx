import OrderItem from "./OrderItem";

export function ListOrders({ orderList }) {
  return (
    <div className="w-full mb-16">
      <div className=" md:block w-full mt-10 mb-10">
        <div className="w-full bg-[#f0f0f0] py-3 font-semibold text-xs md:text-base rounded-md items-center justify-center uppercase hidden md:grid grid-cols-12 mb-6 shadow-lg">
          <div className="text-center col-span-1">
            <span>STT</span>
          </div>
          <div className="text-center col-span-3">
            <span>STATE</span>
          </div>
          <div className="text-center col-span-2">
            <span>TOTAL</span>
          </div>
          <div className="col-span-3 md:col-span-2 text-center">
            <span>DATE</span>
          </div>
          <div className="col-span-2  text-center">
            <span>REVIEWS</span>
          </div>
          <div className="col-span-1 md:col-span-2 text-center ">
            <span>VIEW DETAILS</span>
          </div>
        </div>
        {orderList.length > 0 ? (
          orderList.map((item, index) => (
            <OrderItem data={item} index={index} key={index} />
          ))
        ) : (
          <div className="w-full text-sm border border-b-2 shadow-lg rounded-lg text-center duration-500 py-10 mb-2">
            No data
          </div>
        )}
      </div>
    </div>
  );
}
