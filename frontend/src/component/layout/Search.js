import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Search = () => {
   const Navigation = useNavigate();
  const [keyword,setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        Navigation(`/search/${keyword}`)
    }

   

  return (
    <Fragment>
      
  <div class="p-2 bg-white">
    <form onSubmit={searchHandler} class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value)}/>
      <button class="btn btn-outline-danger" type="submit">Search</button>
    </form>
  </div>

            
</Fragment>   
  )
}

export default Search
