import { CartContext, CartDispatchContext } from './components/cartContext';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from "./pages/cart/cart";

describe('Remove from cart', () => {
    // tests if update works correctly by checking dispatch call parameters
    it('calls dispatch with correct parameters on "remove" click', () => {
      
        
        const mockDispatch = jest.fn();

        // sample cart for testing
        const cart = {
            'Sweetgreen-Irvine': [
              {
                itemName: "Chicken Alfredo",
                itemCount: 2,
                itemPrice: "15",
                totalPrice: 30
              },
              {
                itemName: "Margherita Pizza",
                itemCount: 1,
                itemPrice: "12",
                totalPrice: 12
              }
            ],
            'Taco Bell-Culver City': [
              {
                itemName: "Mango Tango Smoothie",
                itemCount: 1,
                itemPrice: "7",
                totalPrice: 7
              }
            ]
          }
          
        
        render(
            <CartContext.Provider value={ cart }>
                <CartDispatchContext.Provider value={mockDispatch}>
                    <Cart/>
                </CartDispatchContext.Provider>
            </CartContext.Provider>
        );

        // emulate deleting the first item from the cart to test the deletion logic
        const firstRemoveButton = screen.getByTestId('remove00');
        fireEvent.click(firstRemoveButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'delete',
            deletionKey: 'Sweetgreen-Irvine',
            deletionIndex: 0
        });

    });
  });