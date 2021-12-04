import axios from "axios";
const recherche = (someThingToSearch) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios.post(
    "http://localhost:5000/Recherche",
    someThingToSearch,
    config
  );
};
const getAll = () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios.get(
    "http://localhost:5000/get",

    config
  );
};
const functions = {
  recherche,
  getAll,
};
export default functions;
