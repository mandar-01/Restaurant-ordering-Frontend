import { CartContext, CartDispatchContext } from "./components/cartContext";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModifyCartModal from "./components/modifyCartModal";

describe('ModifyCartModal', () => {
    // tests if update works correctly by checking dispatch call parameters
    it('calls dispatch with correct parameters on "save" click', () => {
      
        
        const mockDispatch = jest.fn();
        const cart = {}

        // cart entry before update
        const entry = {
            itemName:"Caprese Panini",
            itemCount: 2,
            itemPrice: 11,
            totalPrice: 22
        }

        // updated entry with count reduced to 1 and total changed to 11
        const newEntry = {
            itemName:"Caprese Panini",
            itemCount: 1,
            itemPrice: 11,
            totalPrice: 11
        }
        const cartKey = "Sweetgreen-Culver City"
        const index = 0
        
        const { getByText } = render(
            <CartContext.Provider value={ cart }>
                <CartDispatchContext.Provider value={mockDispatch}>
            <ModifyCartModal
                show={true}
                setShow={() => {}}
                entry={entry}
                index={index}
                cartKey={cartKey}
            />
            </CartDispatchContext.Provider>
            </CartContext.Provider>
        );
    
        fireEvent.click(getByText('Save'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'update',
            modificationKey: cartKey,
            modificationIndex: index,
            newEntry: newEntry
        });

    });
  });