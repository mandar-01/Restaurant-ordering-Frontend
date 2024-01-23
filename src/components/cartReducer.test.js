const {cartReducer} = require('./cartContext')

test('Add item to empty cart', () => {
    const cart = {}
    const action = {
        type:"add",
        itemName:"Caprese Panini",
        itemCount: 2,
        itemPrice: 11,
        totalPrice: 22,
        restaurantName: "Sweetgreen",
        restaurantLocation:"Irvine"
    }
    const expectedResult = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 2,
            itemPrice: 11,
            totalPrice: 22
          }
        ]
      }

    const result = cartReducer(cart,action)

    expect(result).toEqual(expectedResult);
  });

  test('Add item to non-empty cart', () => {
    const cart = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 2,
            itemPrice: 11,
            totalPrice: 22
          }
        ]
      }

    const action = {
        type:"add",
        itemName:"Caprese Panini",
        itemCount: 2,
        itemPrice: 11,
        totalPrice: 22,
        restaurantName: "Sweetgreen",
        restaurantLocation:"Irvine"
    }
    const expectedResult = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 4,
            itemPrice: 11,
            totalPrice: 44
          }
        ]
      }

    const result = cartReducer(cart,action)

    expect(result).toEqual(expectedResult);
  });

  test('Modify count of an item from cart', () => {
    const cart = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 2,
            itemPrice: 11,
            totalPrice: 22
          }
        ]
      }

    // Simulating changing count of Caprese Panini from 2 to 1
    const newEntry = {
        itemName: "Caprese Panini",
        itemCount: 1,
        itemPrice: 11,
        totalPrice: 11
      }

    const action = {
        type:"update",
        newEntry: newEntry,
        modificationIndex:0,
        modificationKey: "Sweetgreen-Irvine"
    }
    const expectedResult = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 1,
            itemPrice: 11,
            totalPrice: 11
          }
        ]
      }

    const result = cartReducer(cart,action)
  
    expect(result).toEqual(expectedResult);
  });
 
  test('Delete an item from cart', () => {
    const cart = {
        'Sweetgreen-Irvine': [
          {
            itemName: "Caprese Panini",
            itemCount: 2,
            itemPrice: 11,
            totalPrice: 22
          }
        ]
      }

    const action = {
        type:"delete",
        deletionIndex:0,
        deletionKey: "Sweetgreen-Irvine"
    }

    const result = cartReducer(cart,action)
  
    expect(result).toEqual({});
  });