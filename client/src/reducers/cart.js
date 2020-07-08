export default (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "GET_CART":
      return action.payload;
    case "REMOVE_ITEM_FROM_CART":
      return state;
    default:
      return state;
  }
};
