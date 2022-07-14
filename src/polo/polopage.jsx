// import logo from './logo.svg';
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {Polo} from"./Polo"

export function Polopage() {
  const [item,setItem] = useState([])
  const [show,setShow] = useState([]);
  
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
    const data = await fetch("https://men-backend2.herokuapp.com/polo").then((d) => d.json());
    setItem(data)
    setShow(data)
  };
  return (
    <div className="App">
      <h4>SORT AND FILTER BY PRICE</h4>
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
      {/* </select> */}
      <select className = "sort" onChange ={(e)=>{
        if(e.target.value === "80"){
          filter(80)
        }
        else if(e.target.value === "100"){
          filter(100)
        }
        else if(e.target.value === "130"){
          filter(130)
        }
      }}>

        <option >Filter By Price</option>
        <option value="80">Less than $80</option>
        <option value="100">Less than $100</option>
        <option value="130">Less than $130</option>
        
      </select>
      
      <div id="box">
        
        {show.map((e) => {
          return (
           <Link to = {`/polo/${e._id}`}> <Polo
              
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



