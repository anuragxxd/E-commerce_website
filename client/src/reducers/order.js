export default (state = [], action) => {
  switch (action.type) {
    case "ORDER_ITEMS":
      return action.payload;
    default:
      return state;
  }
};
