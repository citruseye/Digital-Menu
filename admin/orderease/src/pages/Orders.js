import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import FeedbackDisplay from "../components/FeedbackDisplay";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // '' means show all, otherwise filter by status

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
      toast.success(response.data.message)
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Filter logic
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  const handleFilterChange = (status) => {
    setFilterStatus(filterStatus === status ? "" : status);
  };

  // Calculate total amount earned today
  const today = moment().startOf("day");
  const totalAmountToday = orders
    .filter((order) => moment(order.date).isSame(today, "day"))
    .reduce((total, order) => {
      console.log(`Adding amount: ${order.amount} from order: ${order._id}`);
      return total + order.amount;
    }, 0);

  console.log(`Total amount earned today: ${totalAmountToday}`);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Orders
      </h2>
      {/* Dashboard */}
      <div className="flex justify-between mb-4">
        <div className="text-xl font-semibold text-blue-600">
          Total Amount Earned Today: ${totalAmountToday}.00
        </div>
        <div className="flex justify-end">
          <select
            onChange={(e) => handleFilterChange(e.target.value)}
            value={filterStatus}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Show All Orders</option>
            <option value="Order Accepted">Order Accepted</option>
            <option value="Food Processing">Food Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Items</th>
            <th className="py-2 px-0.5 border-b-2 border-gray-300">
              Total Quantity
            </th>
            <th className="py-2 px-0.5 border-b-2 border-gray-300">
              Total Price
            </th>
            <th className="py-2 px-0.5 border-b-2 border-gray-300">
              Table Number
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x{item.quantity}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{order.items.length}</td>
              <td className="py-2 px-4 border-b">${order.amount}.00</td>
              <td className="py-2 px-4 border-b">{order.tableNo.tableNo}</td>
              <td className="py-2 px-4 border-b">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status} 
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Order Accepted">Order Accepted</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td className="py-2 px-4 text-center">
                <FeedbackDisplay orderId={order._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
