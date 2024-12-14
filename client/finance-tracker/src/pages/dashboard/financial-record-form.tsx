import { useState } from "react";
import {useUser} from "@clerk/clerk-react"
import { useFinancialContext } from "../../contexts/financial-record-context";



export const FinancialRecordForm = () => {

    const [description,setDescription] = useState<String>("")
    const [amount,setAmount] = useState<String>("")
    const [category,setCategory] = useState<String>("")
    const [payment,setPayment] = useState<String>("")
    const {addRecord} = useFinancialContext()

    const {user} = useUser()

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const newRecord ={
            userId: user?.id ?? " ",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category:category,
            payment:payment
        }
        addRecord(newRecord)
        setDescription("")
        setAmount("")
        setCategory("")
        setPayment("")
    }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description</label>
          <input type="text" required className="input" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Amount:</label>
          <input type="Number" required className="input" value={amount} onChange={(e)=>setAmount(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Category:</label>
          <select required className="input" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="salary">Salary</option>
            <option value="entertainment">Entertainment</option>
            <option value="option">other</option>
          </select>
        </div>

        <div className="form-field">
          <label>Payment Method</label>
          <select required className="input" value={payment} onChange={(e)=>setPayment(e.target.value)}>
            <option value="">Select a payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="banktransfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
