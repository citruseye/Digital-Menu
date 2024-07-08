import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
  const { url, token, cartItems, addToCart } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackOrderId, setFeedbackOrderId] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
    setData(response.data.data);
  };

  const reorderItems = async (order) => {
    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        await addToCart(item._id);
      }
    }
  };

  const handleFeedbackSubmit = async () => {
    if (feedbackOrderId && feedbackText) {
      await axios.post(url + '/api/feedback/create', {
        orderId: feedbackOrderId,
        feedback: feedbackText
      }, { headers: { token } });

      alert('Thank You for your Feedback!');
      setFeedbackOrderId(null);
      setFeedbackText('');
    } else {
      alert('Please write your feedback.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Total Items</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
              <th className="py-2 px-4">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return `${item.name} x${item.quantity}`;
                    } else {
                      return `${item.name} x${item.quantity}, `;
                    }
                  })}
                </td>
                <td className="py-2 px-4 text-center">{order.items.length}</td>
                <td className="py-2 px-4 text-center">${order.amount}.00</td>
                <td className="py-2 px-4 text-center">{order.status}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mr-2"
                    onClick={() => reorderItems(order)}
                  >
                    Reorder
                  </button>
                </td>
                <td className="py-2 px-4 text-center">
                    <button
                      className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                      onClick={() => setFeedbackOrderId(order._id)}
                    >
                      Feedback
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {feedbackOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Submit Feedback</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 mr-2"
                onClick={() => { setFeedbackOrderId(null); setFeedbackText(''); }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
