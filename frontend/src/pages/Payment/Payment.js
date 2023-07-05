import React, { useContext } from 'react';
import { RazorpayContext } from './context/RazorpayContext';

function PaymentComponent() {
  const { rzp, loadRazorpay } = useContext(RazorpayContext);

  const initiatePayment = async () => {
    if (!rzp) {
      await loadRazorpay();
    }

    const options = {
      key: 'rzp_test_TX1mH7CEw3Rbhi',
      amount: 1000, // Customize the amount as per your requirements
      name: 'My Store',
      description: 'Payment for Order',
      handler: function (response) {
        // Handle the payment response here
      },
    };

    rzp.open(options);
  };

  return (
    <div>
      {/* Your payment component UI */}
      <button onClick={initiatePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default PaymentComponent;