import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';

function UserDetails() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({ fname: '', lname: '', email: '', password: '', address: '',orders:'' });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");
                

                if (!userId || !token) {
                    alert("User ID or token not found. Please log in again.");
                    navigate('/login');
                    return;
                }

                const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://indiamart3-backend.onrender.com'}/user/${userId}/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Error fetching user data");

                if (data.status === false) {
                    if (data.message === "Invalid user Id") {
                        alert("Invalid user action");
                        navigate('/Home');
                    } else if (data.message === "User Id is not present in DataBase.") {
                        alert("Account deactivated");
                        navigate('/Login');
                    }
                } else if (data.status === true) {
                    setUserData(data.data);
                    setFormData({
                        fname: data.data.fname || '',
                        lname: data.data.lname || '',
                        email: data.data.email || '',
                        password: '',
                        address: data.data.address || '',
                        orders:data.data.orders || ''
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        };

        getUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        try {
            // const res = await fetch(`https://indiamart3-backend.onrender.com/user/${userId}/profile`, {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://indiamart3-backend.onrender.com'}/user/${userId}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                fname: formData.fname,
                lname: formData.lname,
                email: formData.email,
                ...(formData.password ? { password: formData.password } : {}),
                address: formData.address,
              })
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);
            alert("Profile updated successfully!");
            setUserData(result.data);
        } catch (err) {
            alert("Update failed: " + err.message);
        }
    };

    return (
        <div className="user-details-container">
            <h1>User Details</h1>
            {userData ? (
                <form onSubmit={handleUpdate} className="update-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
                </div>
            
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
                </div>
            
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
            
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
            
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Orders placed:</label>
                    <input type="text" readOnly value={formData.orders ?? ''} />
                </div>
            
                <button type="submit">Update</button>
            </form>
            
            ) : (
                <p className="loading-message">Loading user details...</p>
            )}
        </div>
    );
}

export default UserDetails;
