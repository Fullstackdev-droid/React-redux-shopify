import React, { Component,useEffect,useState } from 'react'
import {actFetchProductsRequest,AddCart,IncreaseQuantity,DecreaseQuantity} from '../actions'
import {useDispatch,useSelector} from 'react-redux';
import stores from '../stores';


export default function Productbuy(props) {
    const dispatch=useDispatch();
    const productList = useSelector(state => state._todoProduct._products);
    const cartList = useSelector(state => state._todoProduct);
    const AddCartValue = item=>dispatch(AddCart(item))
    const IncreaseProductQuantity = key=>dispatch(IncreaseQuantity(key))
    const DecreaseProductQuantity = key=>dispatch(DecreaseQuantity(key))
    const [savings, setSavings]=useState(0);
    const [ButtonId, setButtonId]=useState([]);
 
    let ListCart = [];
    let TotalCart=0;
   
    Object.keys(cartList.Carts).forEach(function(item){
        TotalCart += cartList.Carts[item].quantity * cartList.Carts[item].price;
        ListCart.push(cartList .Carts[item]);
    });

    // Initial product get call
    const productCategoryList = async () => {
        var productData  = await actFetchProductsRequest(dispatch);
    }

    // Add to cart
    const addCart = async (list) => {
        var cartData  = await AddCartValue(list);
        var tempBtnArray = ButtonId
        tempBtnArray.push(list.id)
        setButtonId(tempBtnArray)
    }

    // Product increment in cart
    const IncreaseProdct = async (key,item) => {
        var cartData  = await IncreaseProductQuantity(key);
        SavingsCalculate(item);
       
    }
    const SavingsCalculate = async (item) => {
        var totalQuantity = item.quantity
        var test=(TotalPrice(item.price, item.quantity)-(item.quantity/2).toFixed() * item.price).toFixed(1)
        if (savings == 0){
            setSavings(savings+parseFloat(test))
        }else if (item.id == (cartList.myCart!= undefined && cartList.myCart[0].id)){
            if (totalQuantity % 2 == 0){
                setSavings(savings+parseFloat(item.price));
            }else{
                setSavings(savings)
            }
        }else if (item.id != (cartList.myCart!= undefined && cartList.myCart[0].id)){
            if (totalQuantity % 2 == 0){
                setSavings(savings+parseFloat(item.price));
            }else{
                setSavings(savings)
            }
        }
    }
    // Product decremnt in cart
    const  DecreaseProdct= async (key,item) => {
        var cartData  = await DecreaseProductQuantity(key);
        DecreaseSavingsCalculate(item);
    }

    const DecreaseSavingsCalculate = async (item) => {
        if(item.quantity>1){
            var totalQuantity = item.quantity
            var test=(TotalPrice(item.price, item.quantity)-(item.quantity/2).toFixed() * item.price).toFixed(1)
            if (savings == 0){
                setSavings(savings-parseFloat(test))
            }else if (item.id == (cartList.myCart!= undefined && cartList.myCart[0].id)){
                if (totalQuantity % 2 == 0){
                    setSavings(savings)
                }else{
                    setSavings(savings-parseFloat(item.price));
                }
            }else if (item.id != (cartList.myCart!= undefined && cartList.myCart[0].id)){
                if (totalQuantity % 2 == 0){
                    setSavings(savings)
                }else{
                    setSavings(savings-parseFloat(item.price));
                }
            }
        }
    }

    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString();
    }

    useEffect(() => {
        productCategoryList();
    }, [])
    return (
        <div>
            <div className="container">
                <h5 class="card-title">Shopify</h5>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Product</h5>
                                {
                                    productList && productList.map(list => 
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">{list.itemName} <span class="badge"> £{list.price}</span>
                                            <span class="badge "> 
                                            {ButtonId.indexOf(list.id) != -1  ?
                                                        <button className="btn btn-secondary" onClick={() => addCart(list)}disabled={true}>Add</button>
                                                        :
                                                        <button className="btn btn-primary" onClick={() => addCart(list)}disabled={false}>Add</button>
                                                    }
                                                </span>
                                                
                                                
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        {cartList.Carts.length > 0 &&
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">Basket</h5>
                                    <table className="table">
                                        <tbody>
                                            {cartList.Carts.map((item, key) => {
                                                return (
                                                <tr key={key}>
                                                    <td>{item.itemName}</td>
                                                    <td className="PriceAndQuantity">{item.price} £</td>
                                                    <td className="PriceAndQuantity">
                                                        <span>
                                                        <span
                                                            className="btn btn-danger"
                                                            style={{ margin: "2px" }}
                                                            onClick={() => DecreaseProdct(key,item)}
                                                        >
                                                            -
                                                        </span>
                                                        <span>{" "}{item.quantity}{" "}</span>
                                                        <span
                                                            className="btn btn-success"
                                                            style={{ margin: "2px" }}
                                                            onClick={() => IncreaseProdct(key,item)}
                                                        >
                                                            +
                                                        </span>
                                                        
                                                    <p>Item price £{item.price} * {item.quantity}=£{TotalPrice(item.price, item.quantity)}</p></span>

                                                    <p className="savingsLabel">Savings £{(TotalPrice(item.price, item.quantity)-(item.quantity/2).toFixed() * item.price).toFixed(1)}</p>
                                                    <p>Item cost £{item.quantity % 2 === 0 ? ((Math.floor(item.quantity/2)* item.price).toFixed(1)) : ((item.quantity/2).toFixed() * item.price).toFixed(1)  }</p>
                                                    </td>
                                                </tr>
                                                );
                                                
                                            })}
                                            <tr>
                                                <td colSpan="2" >Sub total:</td>
                                                <td className="PriceAndQuantity">£{Number(TotalCart).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Savings:</td>
                                                <td className="PriceAndQuantity">£{Number(savings).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Total amount:</td>
                                                <td className="PriceAndQuantity">£{Number(TotalCart-savings).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div> 
                </div>
            </div>
        </div>
    );


}
