import React from 'react'

function Transaction({date,description,category,amount,id,onDelete}) {
  return (
    <>
      <tr>
          <td>{date}</td>
          <td>{description}</td>
          <td>{category}</td>
          <td>{amount}</td>
          <td><button onClick={()=>onDelete(id)}>delete</button></td>

        </tr>
    </>
  )
}

export default Transaction