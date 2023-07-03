export const initialState = {
  order: {
    object1: {},
    object2: {},
    object3: [],
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "Shipping":
      return {
        ...state,
        order: {
          ...state.order,
          object1: {
            ...action.payload,
          },
        },
      };
    case "Billing":
      return {
        ...state,
        order: {
          ...state.order,
          object2: {
            ...state.order.object2,
            ...action.payload,
          },
        },
      };
    case "CartItems":
      return {
        ...state,
        order: {
          ...state.order,
          object3: [...action.payload],
        },
      };
    default:
      return state;
  }
};
