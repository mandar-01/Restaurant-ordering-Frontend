import { CartContext, CartDispatchContext } from "./components/cartContext";
import CartModal from "./components/cartModal";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CartModal', () => {
    it('calls dispatch with correct parameters on "Add to cart" click', () => {
      
      const mockDispatch = jest.fn();
      const cart = {}
      const restaurantDetails = {
        id: "1",
        location: "Culver City",
        menu: [
          {
            description: "Grilled panini with fresh tomatoes, mozzarella, and basil pesto.",
            item: "Caprese Panini",
            price: "11"
          },
          {
            description: "Colorful stir-fried vegetables served with a savory soy-ginger sauce.",
            item: "Vegetable Stir-Fry",
            price: "14"
          },
          {
            description: "Fluffy pancakes filled with juicy blueberries and topped with maple syrup.",
            item: "Blueberry Pancakes",
            price: "9"
          },
          {
            description: "Roast chicken seasoned with zesty lemon and garlic.",
            item: "Lemon Garlic Roast Chicken",
            price: "17"
          },
          {
            description: "Decadent layers of dark, milk, and white chocolate mousse on a chocolate crust.",
            item: "Triple Chocolate Mousse Cake",
            price: "12"
          }
        ],
        name: "Sweetgreen"
      }
      
      const itemIndex = 0;
      // Render the component with the CartProvider and mocked dispatch
      const { getByText } = render(
        <CartContext.Provider value={ cart }>
            <CartDispatchContext.Provider value={mockDispatch}>
          <CartModal
            show={true}
            setShow={() => {}}
            restaurantDetails={restaurantDetails}
            itemIndex={itemIndex}
          />
          </CartDispatchContext.Provider>
        </CartContext.Provider>
      );
  
      fireEvent.click(getByText('Add to cart'));
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'add',
        restaurantName: 'Sweetgreen',
        restaurantLocation: 'Culver City',
        itemName: 'Caprese Panini',
        itemCount: 1, 
        itemPrice: "11",
        totalPrice: 11,
      });

    });
  });