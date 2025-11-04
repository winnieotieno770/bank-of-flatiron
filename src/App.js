import { useEffect, useState , useMemo} from 'react';
import './App.css';
import Alltransactions from './Alltransactions';
import Search from './Search';
import AddTransactionForm from './AddTransactionForm';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] =useState([])
  const [search, setSearch] =useState("")

  useEffect(()=>{
     function fetchAllTransactions(){
      fetch("http://localhost:8001/transactions")
      .then(res=>res.json())
      .then(data=>{
        setTransactions(data)
        setIsLoading(false)
      })
      .catch(()=>{
        console.error("Could not fetch data")
        setIsLoading(false)
     });
      
     }
     fetchAllTransactions()
    
  },[])

  function handleAddTransaction(newTransaction) {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  }
 
  function deleteTransaction(id){
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE"
    })
    .then(()=>{

      setTransactions(transactions.filter(transaction=>transaction.id !== id))
    })
    .catch(err=>console.error("Error deleting transaction", err))
  }

  function handleSearch(e){
    setSearch(e.target.value)
  }
 const filtereditems = useMemo(()=> {
  const query = search.toLowerCase()
  if(!query){
    return transactions
  }
  return transactions.filter(transaction=>{
    const values = Object.values(transaction)
   return values.some(value=>{
      return String(value).toLowerCase().includes(query)
    })
  })
 },[transactions,search])
   
 
  return (
    <>
     <h1>Bank of Flatiron</h1>
     <Search onSearch={handleSearch}/>
     <AddTransactionForm onFormSubmit={handleAddTransaction}/>
     {isLoading && <p>Fetching the latest transactions</p>}
     {!isLoading && transactions.length > 0 &&
     <Alltransactions transactions={filtereditems} onDelete={deleteTransaction}/>
     
     }
  
    </>
  );
}

export default App;
