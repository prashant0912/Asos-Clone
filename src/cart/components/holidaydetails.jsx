import { useParams } from "react-router"
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import "./product.css"
export var desc = "";
export var price = "";
export var image = "";
export const Holidaydetails = ()=>{
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();

    const [item,setItem] = useState({})
    desc = item.Description;
    price = item.Price;
    image = item.image;
 
  useEffect(() => {
    getdata();
  }, []);

  

  const getdata = async () => {
    const data = await fetch(`https://men-backend2.herokuapp.com/holiday/${id}`).then((d) => d.json());
    setItem(data)
    
  };


    return (
        <div>
        
            <div id="firsttwobox">
                <div id="leftmensdiv">
                    <div id="textfirst">
                        <p>GET 30% OFF JEANS!*</p>
                        <p>TOPMAN, ASOS DESIGN&MORE</p>
                        <p>With code: STAPLES</p>
                    </div>

                </div>
                <div id="rightmensdiv">
                    <div id="textsecond">
                        <p>EXTRA 20% OFF*</p>
                        <p>SUN-READY TEES, SHORTS&MORE</p>
                        <p>With code: 20DEGREES</p>
                    </div>
                </div>
            </div>
            <div className = "desc">{item.Description}</div>
            <div className = "price">£{item.Price}.00</div>
            <button className = "add" onClick = {()=>{
                navigate("/add_cart")
            }}>ADD TO BAG</button>
            <div className = "pic_div"><img className = "pic" src={item.image} alt="" /></div>
            
            
            

        </div>
    )
}