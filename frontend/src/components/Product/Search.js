import React, {useState,Fragment} from 'react'
import "./Search.css"
import MetaData from '../layout/MetaData';
 
const Search = ({history}) => {
const [keyword, setKeyword] = useState("");

//when form is submitted 
//e>event
const searchSubmitHandler = (e) => {
  //prevents laoding of page after form is submitted
    e.preventDefault();
    if (keyword.trim()) {
      //if keyword is valid then show hat particular prod
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };



  return(
   <Fragment>
    <MetaData title="SEARCH" />
<form className="searchBox" onSubmit={searchSubmitHandler}>
    <input
    type="text"
    placeholder='Search a Product'
    onChange={(e)=>setKeyword(e.target.value)}
    
    
    />
    <input type="submit"  value="Search"/>

</form>
  </Fragment>
  );
};

export default Search
