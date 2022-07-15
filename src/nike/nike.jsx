// import logo from './logo.svg';
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {Nike} from"./components/Nike"


export function Nikepage() {
  const [item,setItem] = useState([])
  const [show,setShow] = useState([]);
  
useEffect(() => {
    getdata();
  },[]);

  const handlesort = ()=>{
    const sorted = [...show].sort(function(a,b){
      return a.Price-b.Price
    })
    setShow(sorted)
  }
  const handlesort1 = ()=>{
    const sorted = [...show].sort(function(a,b){
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
    const data = await fetch("https://men-backend2.herokuapp.com/nike").then((d) => d.json());
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

        <option >SORT BY  PRICE</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
        
      </select>
      
      <select className = "sort" onChange ={(e)=>{
        if(e.target.value === "20"){
          filter(40)
        }
        else if(e.target.value === "28"){
          filter(80)
        }
        else if(e.target.value === "40"){
          filter(117)
        }
      }}>

        <option >Filter By Price</option>
        <option value="20">Less than $40</option>
        <option value="28">Less than $80</option>
        <option value="40">Less than $105</option>
        
      </select>
      
      <div id="box">
        
        {show.map((e) => {
          return (
           <Link to = {`/nike/${e._id}`}> <Nike
              
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



