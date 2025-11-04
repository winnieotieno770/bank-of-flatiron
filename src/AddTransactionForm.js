import React, { useState } from 'react'

function AddTransactionForm({onFormSubmit}) {
    
    const CATEGORIES = ["Food","Housing", "Shopping", "Fashion","Transport", "Income", "Utilities", "Gift"]
    const [formData, setFormData] = useState({
        date:"",
        description:"",
        category:"",
        amount:""
        
    })

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevData =>({
            ...prevData,
            [name]:value

        }))
    }
    function handleSubmit(e){
        e.preventDefault()
        
        const newTransaction = {
        ...formData,
        amount: parseFloat(formData.amount),
    };
    // Send a POST request to your local API
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then(response => response.json())
      .then(data => {
        // Call the function passed from the parent to update the main state
        onFormSubmit(data); 
        // Reset the form fields after successful submission
        setFormData({
            date: '',
            description: '',
            category: '',
            amount: '',
        });
      })
      .catch(error => console.error("Error adding transaction:", error));
  }
    
    

  return (
    <>
        <div className="form-container">
    <h2>Add New Transaction</h2>
    
    
    <form onSubmit={handleSubmit} className="add-transaction-form">
        
        <div className="form-group">
            <label htmlFor="date">Date</label>
               <input 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
            />
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input 
                type="text" 
                id="description" 
                name="description" 
                placeholder="Description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
            />
        </div>

        <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
            >
                <option value="">-- Select a Category --</option>
                
           
                {CATEGORIES.map(categoryName => (
                    <option key={categoryName} value={categoryName}>
                        {categoryName}
                    </option>
                ))}
                
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input 
                type="number" 
                id="amount" 
                name="amount" 
                placeholder="Amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
                step="0.01"
            />
        </div>
        
        <button type="submit" className="submit-btn">
            Add Transaction
        </button>
    </form>
</div>
    </>
  )
}

export default AddTransactionForm