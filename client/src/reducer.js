export const initialState = {
    basket: [],
    user: undefined,
};

// selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => amount + item.price, 0);
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`cannot remove the item (id : ${action.id}) as it is not in the basket`);
            }
            return {
                ...state,
                basket: newBasket,
            };
        case "SET__USER":
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;
