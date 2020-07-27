import axios from "axios";
import history from "../history";
// import setAuthToken from "../utils/setAuthToken"

export const fetchUser = () => async (dispatch) => {
  const user = await axios.get("/api/users/5ef88768aa952417960d69b5");
  dispatch({
    type: "GET_USER_BY_ID",
    payload: user.data,
  });
};

export const addUser = (formValues) => async (dispatch) => {
  const user = await axios.post("/api/users", formValues);
  dispatch({
    type: "ADD_USER",
    payload: user.data,
  });
  history.push("/login");
};

export const loginUser = (formValues) => async (dispatch) => {
  const user = await axios.post("/api/users/login", formValues);
  // const token = user.data.token;
  // localStorage.setItem("jwtToken", token);
  // console.log(localStorage);
  // setAuthToken(localStorage.jwtToken);
  dispatch({
    type: "LOGIN_USER",
    payload: { ...user.data.user },
  });
  history.push("/");
};

export const getUser = () => async (dispatch) => {
  // setAuthToken(localStorage.jwtToken);
  const user = await axios.post("/api/users/me");
  // console.log(localStorage);
  dispatch({
    type: "GET_USER",
    payload: user.data,
  });
};

export const logoutUser = () => async (dispatch) => {
  await axios.post("/api/users/logout");
  // localStorage.removeItem("jwtToken");
  // setAuthToken(false);
  dispatch({
    type: "LOGOUT_USER",
  });
  history.push("/");
};

export const fetchItems = () => async (dispatch) => {
  const response = await axios.get("/api/items");
  dispatch({
    type: "GET_ALL_ITEMS",
    payload: response.data,
  });
};

export const getItemById = (id) => async (dispatch) => {
  const response = await axios.get(`/api/item/${id}`);
  dispatch({
    type: "GET_ITEM_BY_ID",
    payload: response.data,
  });
};

export const addToCart = (id) => async (dispatch) => {
  const response = await axios.post(`/api/cart/${id}`);
  dispatch({
    type: "ADD_TO_CART",
    payload: response.data,
  });
};

export const getCart = () => async (dispatch) => {
  const response = await axios.get("/api/cart");
  dispatch({
    type: "GET_CART",
    payload: response.data,
  });
};

export const removeItemFromCart = (id) => async (dispatch) => {
  const response = await axios.delete(`api/cart/${id}`);
  dispatch({
    type: "REMOVE_ITEM_FROM_CART",
    payload: response.data,
  });
};

export const updateItem = (id, quantity) => async (dispatch) => {
  const json = { quantity: quantity };
  const response = await axios.patch(`api/cart/${id}`, json);
  dispatch({
    type: "UPDATE_ITEM",
    payload: response.data,
  });
};

export const sellItem = (formValues) => async (dispatch) => {
  const response = await axios.post("/api/sell", formValues);
  dispatch({
    type: "SELL_ITEM",
    payload: response.data,
  });
};

export const sellItemList = () => async (dispatch) => {
  const response = await axios.get("/api/sell");
  dispatch({
    type: "SELL_ITEM_LIST",
    payload: response.data,
  });
};

export const removeItem = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/sell/${id}`);
  dispatch({
    type: "REMOVE_ITEM",
    payload: response.data,
  });
};

export const updateItemForSell = (id, formValues) => async (dispatch) => {
  console.log(formValues);
  const response = await axios.patch(`/api/sell/${id}`, formValues);
  dispatch({
    type: "UPDATE_ITEM",
    payload: response.data,
  });
};

export const uploadImage = (id, formdata) => async (dispatch) => {
  const response = await axios.post(`/api/items/${id}/image`, formdata);
  dispatch({
    type: "UPLOAD_IMAGE",
  });
};

export const deleteImage = (itemId, imageId) => async (dispatch) => {
  const response = await axios.delete(`/api/items/${itemId}/image/${imageId}`);
  dispatch({
    type: "DELETE_IMAGE",
    payload: response.data,
  });
};

export const paymentSuccess = (items, data) => async (dispatch) => {
  await axios.post("/api/payment/success", { items, data });
};

export const orders = (items, data) => async (dispatch) => {
  const response = await axios.get("/api/orders");
  dispatch({
    type: "ORDER_ITEMS",
    payload: response.data,
  });
};
