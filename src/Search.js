import React from 'react'

function Search({search,onSearch}) {
  return (
    <div>
        <input type='search' placeholder='search' onChange={onSearch} value={search}/>
    </div>
  )
}

export default Search