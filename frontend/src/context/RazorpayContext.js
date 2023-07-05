import { useState, useContext, createContext, useEffect } from "react";

const PaymentContext = createContext();
const PaymentProvider = ({ children }) => {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    const loadRazorpay = () => {
      const razorpay = new window.Razorpay({
        key: 'rzp_test_TX1mH7CEw3Rbhi',
        currency: 'INR',
        // Add any additional options here
      });

      setPayment(razorpay);
    };

    script.onload = loadRazorpay;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PaymentContext.Provider value={payment}>
      {children}
    </PaymentContext.Provider>
  );
};

const usePayment = () => useContext(PaymentContext);

export { usePayment, PaymentProvider };