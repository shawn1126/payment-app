import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://us-central1-zombie-wallet.cloudfunctions.net",
  // baseURL:"http://127.0.0.1:5001/wallet-ae9fe/us-central1"
  //   add auth token here
});
