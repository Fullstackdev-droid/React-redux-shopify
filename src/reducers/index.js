import { combineReducers } from 'redux';
import {GET_ALL_PRODUCT,GET_NUMBER_CART,ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY} from  '../actions';

const initProduct = {
    numberCart:0,
    Carts:[],
    myCart:[],
    _products:[]
}

function todoProduct(state = initProduct,action){
    switch(action.type){
        case GET_ALL_PRODUCT: 
            return{
                ...state,
                _products:action.payload
            }
        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart==0){
                let cart = {
                    id:action.payload.id,
                    quantity:1,
                    itemName:action.payload.itemName,
                    count:action.payload.count,
                    price:action.payload.price
                } 
                state.Carts.push(cart); 
                state.myCart.push(cart);
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item.id==action.payload.id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload.id,
                        quantity:1,
                        itemName:action.payload.itemName,
                        count:action.payload.count,
                        price:action.payload.price
                    }
                    var temparray =state.Carts
                    
                    temparray.push(_cart);
                    state.Carts.concat(temparray)
                    state.myCart.concat(temparray);

                    state.numberCart=state.numberCart+1;

                    return{
                        ...state,
                        MyCart:action.payload
                    }
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1,
                MyCart:action.payload
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
        default:
            return state;
    }
}
const ShopApp = combineReducers({
    _todoProduct:todoProduct
});
export default ShopApp;