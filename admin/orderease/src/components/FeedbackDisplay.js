import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackDisplay = ({ orderId }) => {
  const [feedback, setFeedback] = useState(null);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/feedback/${orderId}`)
      setFeedback(response.data.data.feedback);
    } catch (error) {
      console.error('Failed to fetch feedback', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [orderId]);

  return (
    <div className="mt-4">
      <p className="text-gray-700">{feedback || 'No feedback yet'}</p>
    </div>
  );
};

export default FeedbackDisplay;