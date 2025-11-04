import React from 'react'
import Transaction from './Transaction'

function Alltransactions({transactions, onDelete}) {
  return (
    <>
        <table>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {transactions.map(transaction=>{
              return               <Transaction date={transaction.date} description={transaction.description} category={transaction.category} amount={transaction.amount} key={transaction.id} id={transaction.id} onDelete={onDelete}/>
            })}
      
            </tbody>
        </table>
    </>
  )
}

export default Alltransactions