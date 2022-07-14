import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import "./Women.css"
import {Women} from"./Women"


export function WomenPage() {
  const [item,setItem] = useState([])
  const[show,setShow] = useState([]);
  
useEffect(() => {
    getdata();
  },[]);

  const handlesort = ()=>{
    const sorted = [...item].sort(function(a,b){
      return a.Price-b.Price
    })
    setShow(sorted)
  }
  const handlesort1 = ()=>{
    const sorted = [...item].sort(function(a,b){
      return b.Price-a.Price
    })
    setShow(sorted)
    
  }
  const filter = (price)=>{
    const filteredata = [...item].filter((e)=>{
      if(e.Price<price){
        return e.Price
      }
    })
    setShow(filteredata)
  }

    
  

  const getdata = async () => {
    const data = await fetch("https://backend-women1.herokuapp.com/women").then((d) => d.json());
    setItem(data)
    setShow(data)
  
  };
  return (
    <div className="App">
      <h1>SORT AND FILTER BY PRICE</h1>
      <select className = "sort" onChange ={(e)=>{
        if(e.target.value === "low"){
          handlesort()
        }
        else{
          handlesort1()
        }
      }}>

        <option >Sort By Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
        
      </select>
      <select className = "sort" onChange ={(e)=>{
        if(e.target.value === "20"){
          filter(20)
        }
        else if(e.target.value === "28"){
          filter(28)
        }
        else if(e.target.value === "40"){
          filter(40)
        }
      }}>

        <option >Filter By Price</option>
        <option value="20">Less than $20</option>
        <option value="28">Less than $28</option>
        <option value="40">Less than $40</option>
        
      </select>
      
      <div id="box">
        
        {show.map((e) => {
          return (
            <Link to = {`/womens/${e._id}`}>
            <Women
              
              image={e.image}
              description={e.Description}
              price={e.Price}
            />
            </Link>
            
          );
        })}
      </div>
      
    </div>
  );
}