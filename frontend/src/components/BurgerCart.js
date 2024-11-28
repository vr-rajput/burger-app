import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faCheese, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BurgerCart = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [slices, setSlices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customerMobile, setCustomerMobile] = useState('');
  const [error, setError] = useState('');

  // Fetch the next order number
  const fetchNextOrderNumber = async () => {
    try {
      console.log("env", process.env.REACT_APP_API_URL);
      const response = await axios.get(`/order/next`);
      setOrderNumber(response.data.orderNumber);
    } catch (error) {
      console.error('Error fetching order number:', error);
      toast.error('Failed to fetch the next order number.');
    }
  };

  useEffect(() => {
    fetchNextOrderNumber();
  }, []);

  const sliceOptions = [
    { name: 'Aloo Tikki', price: 30, icon: <FontAwesomeIcon icon={faHamburger} /> },
    { name: 'Paneer', price: 40, icon: <FontAwesomeIcon icon={faUtensils} /> },
    { name: 'Cheese', price: 20, icon: <FontAwesomeIcon icon={faCheese} /> },
  ];

  const sliceBackgroundColors = ['#FFDDC1', '#D4F4DD', '#E0DDFF'];

  const addSlice = (slice) => {
    setSlices([...slices, slice]);
  };

  const removeSlice = (index) => {
    const newSlices = [...slices];
    newSlices.splice(index, 1);
    setSlices(newSlices);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleMobileSubmit = async () => {
    if (!customerMobile || !/^\d{10}$/.test(customerMobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      toast.error('Invalid mobile number. Please enter a valid 10-digit number.');
      return;
    }
    setError('');

    const items = slices.map((slice) => ({ name: slice.name, price: slice.price }));

    try {
      const response = await axios.post(`/order`, {
        customerMobile,
        items,
        orderNumber,
      });

      toast.success(`Order placed successfully! Order Number: ${response.data.order.orderNumber}`);

      setSlices([]);
      setTotalPrice(0);
      setQuantity(1);
      setCustomerMobile('');
      setIsModalOpen(false);
      fetchNextOrderNumber();
    } catch (error) {
      toast.error('Error placing order. Please try again later.');
      console.error('Error placing order:', error);
    }
  };

  // Calculate the total price based on quantity
  const calculateTotalPrice = () => {
    const slicePrice = slices.reduce((acc, slice) => acc + slice.price, 0);
    return slicePrice * quantity;
  };

  return (
    <div>
      <ToastContainer />
      <h2>Your Burger Order</h2>
      <div>
        <h3>Next Order Number: {orderNumber}</h3>
      </div>

      <div>
        <h3>Add Slices</h3>
        {sliceOptions.map((slice, index) => (
          <button key={index} onClick={() => addSlice(slice)}>
            {slice.icon} {slice.name} (₹{slice.price})
          </button>
        ))}
      </div>

      <div>
        <h3>Your Burger</h3>
        <div style={sliceContainerStyle}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>================== Bread</div>
          {slices.map((slice, index) => (
            <div
              key={index}
              style={{
                ...sliceItemStyle,
                backgroundColor: sliceBackgroundColors[index % sliceBackgroundColors.length],
              }}
            >
              {slice.icon} {slice.name} (₹{slice.price})
              <button
                onClick={() => removeSlice(index)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#f44',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div>================== Bread</div>
        </div>
      </div>

      <div>
        <h3>Total Price: ₹{calculateTotalPrice()}</h3>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          style={{ marginLeft: '10px', padding: '5px', width: '50px' }}
        />
      </div>

      <div>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Enter Your Mobile Number</h3>
            <input
              type="text"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              placeholder="Enter 10-digit number"
              style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleMobileSubmit} style={{ marginRight: '10px' }}>
              Submit
            </button>
            <button
              onClick={() => {
                setCustomerMobile('');
                setError('');
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the slices container (flexbox layout)
const sliceContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  flexDirection: "column-reverse",
  justifyContent: "space-between",
  alignContent: "center",
};

const sliceItemStyle = {
  padding: '10px',
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '150px', // Ensure each slice takes a minimum width
  textAlign: 'center',
};

// Styles for the modal
const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center',
};

export default BurgerCart;
