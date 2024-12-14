import { useUser } from '@clerk/clerk-react';
import { createContext,  useContext, useEffect, useState} from 'react'

export interface FinancialRecord {
    id?:string;
    userId:string;
    date: Date;
    description:string;
    amount:number;
    category:string;
    payment:string;
}

interface FinancialRecordContextType {
    records: FinancialRecord[];
    addRecord: (record:FinancialRecord)=> void;
    updateRecord: (id:string,newRecord:FinancialRecord)=>void;
    deleteRecord: (id:string)=>void;
}

export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined)

export const FinancialRecordProvider = ({children}:{children:React.ReactNode})=>{

  const [records,setRecords]= useState<FinancialRecord[]>([])
  const {user} = useUser();

  const fetchRecords = async ()=>{
    if(!user) return;
    const response = await fetch(`http://localhost:3001/financial-records/getAllByUserId/${user.id}`)

    if(response.ok){
      const records = await response.json()
      console.log(records)
      setRecords(records)
    }
  }

  useEffect(()=>{
    fetchRecords()
  },[user])


  const addRecord =  async (record:FinancialRecord)=>{
    const response = await fetch("http://localhost:3001/financial-records",
      {
        method:"POST",
        body: JSON.stringify(record),
        headers:{
          "Content-Type": "application/json"
        },
      }
    )
    try{
      if(response.ok){
        const newRecord = await response.json()
        setRecords((prev)=>[...prev,newRecord])
      }
    }catch(err){
      console.error(err)
    }
  }
  const updateRecord = async (id:string, newRecord: FinancialRecord) =>{
    const response = await fetch(`http://localhost:3001/financial-records/${id}`,
      {
        method: "PUT",
        body:  JSON.stringify(newRecord),
        headers:{
          "Content-Type":"application/json"
        }
      }
    )
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record.id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.error(err)
    } 
    
  }
  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record.id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.error(err)
    }
  };



    return (
      <FinancialRecordContext.Provider value={{records,addRecord,updateRecord,deleteRecord}}>
        {children}
      </FinancialRecordContext.Provider>  
    )
}

export const useFinancialContext = ()=>{
  const context = useContext<FinancialRecordContextType | undefined>(FinancialRecordContext)
  if(!context){
    throw new Error(
      "useFinancialContext must be used within a FinancialRecordProvider"
    )
  }

  return context 
}