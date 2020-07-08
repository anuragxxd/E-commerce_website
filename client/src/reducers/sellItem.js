export default (state = [], action) => {
  switch (action.type) {
    case "SELL_ITEM":
      return action.payload;
    case "SELL_ITEM_LIST":
      return action.payload;
    default:
      return state;
  }
};
