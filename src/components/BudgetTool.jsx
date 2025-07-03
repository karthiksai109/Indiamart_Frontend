// import React, { useState } from "react";

// const BudgetTool = ({ token }) => {
//     const [budget, setBudget] = useState("");
//     const [items, setItems] = useState("");
//     const [result, setResult] = useState(null);

//     const handleCheckBudget = async () => {
//         try {
//             const response = await fetch("https://indiamart3-backend.onrender.com/budget-check", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     budget: parseFloat(budget),
//                     items: items.split(",").map(item => item.trim())
//                 })
//             });
//             const data = await response.json();

//             if (data.missingItems && data.missingItems.length > 0) {
//                 alert(`We don't sell these items: ${data.missingItems.join(", ")}`);
//             }

//             setResult(data);
//         } catch (error) {
//             console.error("Error checking budget:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Budget Planning Tool</h2>
//             <div>
//                 <label>Enter Budget: </label>
//                 <input
//                     type="number"
//                     value={budget}
//                     onChange={(e) => setBudget(e.target.value)}
//                     placeholder="Enter your budget"
//                 />
//             </div>
//             <div>
//                 <label>Enter Items (comma-separated): </label>
//                 <textarea
//                     value={items}
//                     onChange={(e) => setItems(e.target.value)}
//                     placeholder="e.g., Apple, Banana, Milk"
//                 />
//             </div>
//             <button onClick={handleCheckBudget}>Check Budget</button>
//             {result && (
//                 <div>
//                     <h3>Budget Summary</h3>
//                     <p>Total Budget: ${result.budget}</p>
//                     <p>Total Cost: ${result.totalCost}</p>
//                     <p>
//                         {result.withinBudget
//                             ? "The items fit within your budget."
//                             : "The items exceed your budget."}
//                     </p>
//                     {result.availableItems && result.availableItems.length > 0 && (
//                         <div>
//                             <h4>Available Items:</h4>
//                             <ul>
//                                 {result.availableItems.map((item, index) => (
//                                     <li key={index}>{item.name} - ${item.price}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BudgetTool;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS LINE

const BudgetTool = ({ token }) => {
    const [budget, setBudget] = useState("");
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate(); // INIT NAVIGATE

    const handleCheckBudget = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`https://indiamart-backend-3.onrender.com/user/${userId}/budget-plan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ budget: parseFloat(budget) })
            });

            const data = await response.json();
            if (data.status && data.plans) {
                setPlans(data.plans);
            } else {
                alert("No plans available for this budget.");
            }
        } catch (error) {
            console.error("Error checking budget:", error);
            alert("Something went wrong while fetching budget plans.");
        }
    };

    const handleAddToCartAndPay = (plan) => {
        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        plan.forEach((newItem) => {
            const match = existingCart.find(item => item._id === newItem._id);
            if (match) {
                match.quantity += 1; // or you can do += newItem.quantity if defined
            } else {
                existingCart.push({ ...newItem, quantity: 1 });
            }
        });
    
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert("Plan items added to cart. Redirecting to payment...");
        navigate("/cart"); // make sure /cart points to updated Cart component
    };
    
    return (
        <div>
            <h2>Budget Planning Tool</h2>
            <div>
                <label>Enter Budget: </label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter your budget"
                />
                <button onClick={handleCheckBudget}>Get Plans</button>
            </div>

            {plans.map((plan, index) => (
                <div key={index} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
                    <h3>Plan {index + 1}</h3>
                    <ul>
                        {plan.map(item => (
                            <li key={item._id}>{item.name} - ${item.price}</li>
                        ))}
                    </ul>
                    <button onClick={() => handleAddToCartAndPay(plan)}>
                        Add All & Go to Payment
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BudgetTool;
