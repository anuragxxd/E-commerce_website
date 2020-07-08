export default (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_ITEMS":
      return action.payload;
    case "GET_ITEM_BY_ID":
      return action.payload;
    default:
      return state;
  }
};
