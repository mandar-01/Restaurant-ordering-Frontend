import { createContext, useReducer } from 'react';

export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null); 

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, []);
  
    return (
      <CartContext.Provider value={cart}>
        <CartDispatchContext.Provider value={dispatch}>
          {children}
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    );
  }

  function cartReducer(cart,action) { 
    switch (action.type){
      case 'add': {
        const cartKey = action.restaurantName+"-"+action.restaurantLocation;
        const newItem = {
            itemName: action.itemName,
            itemCount: action.itemCount,
            itemPrice: action.itemPrice,
            totalPrice: action.totalPrice
          };

        if (cart.hasOwnProperty(cartKey)) {
            return {
                ...cart,
                [cartKey]:[...cart[cartKey], newItem]
            }
        }
        else{
            return {
                ...cart,
                [cartKey]:[newItem]
            };
        }
      }
      case 'update':{
        const cartKey = action.modificationKey;
        const index = action.modificationIndex;
        const newEntry = action.newEntry;
        cart[cartKey][index] = newEntry;
        return cart;
      }
      case 'delete':{
        const cartKey = action.deletionKey;
        const deleteIndex = action.deletionIndex;
        const newCart = {...cart};
        newCart[cartKey] = cart[cartKey].filter((_,index) => index!==deleteIndex);
        if (newCart[cartKey].length === 0){
          delete newCart[cartKey];
        }
        return newCart;
      } 
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }