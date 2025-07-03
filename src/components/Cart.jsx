// import React from "react";
// import "./Cart.css";
// import { useNavigate } from 'react-router-dom'





// const orders = localStorage.getItem("orders");
// const Cart = ({ cartItems, deleteFromCart }) => {
    
//     console.log(cartItems)
//     const navigate = useNavigate();
//     const totalAmount = cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     const handlePayment = async () => {
//         const userId = localStorage.getItem("userId");
//         const token=localStorage.getItem('token')
//         const resp = await fetch(`http://localhost:3000/user/${userId}/updateOrders`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });
        
    
     
//          alert("Redirecting to payment gateway...");
//         navigate('/')
//         window.location.reload();
        
        
//     };

//     return (
//         <div className="cart-container">
//             <h2>Your Shopping Cart</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     <ul>
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="cart-item">
//                                 <div className="item-details">
//                                     <img
//                                         src={item.imageUrl || "https://via.placeholder.com/50"}
//                                         alt={item.name}
//                                         className="item-image"
//                                     />
//                                     <div className="item-info">
//                                         {item.name} - Quantity: {item.quantity}
//                                     </div>
//                                 </div>
//                                 <div className="cart-actions">
//                                     <button
//                                         className="decrease-btn"
//                                         onClick={() => deleteFromCart(item._id, 1)}
//                                     >
//                                         -
//                                     </button>
//                                     <button
//                                         className="delete-btn"
//                                         onClick={() => deleteFromCart(item._id, item.quantity)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="cart-summary">
//                         Total: ${totalAmount.toFixed(2)}
//                     </div>
//                     <button className="make-payment" onClick={handlePayment}>
//                         Make Payment
                    
//                     </button>
                    
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import "./Cart.css";
// import { useNavigate } from 'react-router-dom';

// const Cart = ({ deleteFromCart }) => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//             setCartItems(JSON.parse(storedCart));
//         }
//     }, []);

//     const totalAmount = cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     const handlePayment = async () => {
//         const userId = localStorage.getItem("userId");
//         const token = localStorage.getItem('token');
    
//         const resp = await fetch(`http://localhost:3000/user/${userId}/updateOrders`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
                    
                
        
//         localStorage.removeItem("cart");
    
//         alert("Order placed! Redirecting to home...");
//         navigate('/');
//         window.location.reload();
//     };
    
//     return (
//         <div className="cart-container">
//             <h2>Your Shopping Cart</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     <ul>
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="cart-item">
//                                 <div className="item-details">
//                                     <img
//                                         src={item.imageUrl || "https://via.placeholder.com/50"}
//                                         alt={item.name}
//                                         className="item-image"
//                                     />
//                                     <div className="item-info">
//                                         {item.name} - Quantity: {item.quantity}
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="cart-summary">
//                         Total: ${totalAmount.toFixed(2)}
//                     </div>
//                     <button className="make-payment" onClick={handlePayment}>
//                         Make Payment
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart"));

            return Array.isArray(storedCart) ? storedCart : [];
        } catch (e) {
            return [];
        }
    });

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePayment = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        try {
            await fetch(`https://indiamart-backend-4.onrender.com/user/${userId}/updateOrders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if(!userId){
                localStorage.removeItem("cart");
                alert("Please login to place your order...");
                navigate('/login')
                window.location.reload();
            }
            else{
            // Clear cart
            localStorage.removeItem("cart");
            alert("Payment complete! Redirecting to home...");
            navigate('/'); // 👈 Hard reload the page to reset all state
            window.location.reload();
            }
            
        } catch (error) {
            alert("Payment failed.");
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} className="cart-item">
                                <div className="item-details">
                                    <img
                                        src={item.imageUrl || "https://via.placeholder.com/50"}
                                        alt={item.name}
                                        className="item-image"
                                    />
                                    <div className="item-info">
                                        <strong>{item.name}</strong> - Quantity: {item.quantity}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <strong>Total: ${totalAmount.toFixed(2)}</strong>
                    </div>
                    <button className="make-payment" onClick={handlePayment}>
                        Make Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
