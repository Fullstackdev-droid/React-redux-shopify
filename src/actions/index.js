export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';

export const actFetchProductsRequest = (dispatch) => {
    var products= [
        {id : 1, itemName : "Bread", price: 1.10, count: 1},
        {id : 2, itemName : "Milk", price: 0.50, count: 1},
        {id : 3, itemName : "Cheese", price: 0.90, count: 1},
        {id : 4, itemName : "Soup", price: 0.60, count: 1},
        {id : 5, itemName : "Butter", price: 1.20, count: 1}
    ]
    dispatch(GetAllProduct(products));
}

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload){
    return{
        type:'GET_ALL_PRODUCT',
        payload
    }
}

/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type:'GET_NUMBER_CART'
    }
}

/*ADD CART*/
export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}
/*UPDATE CART*/
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
/*INCREMENT CART*/
export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
/*DECREMENT CART*/
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}