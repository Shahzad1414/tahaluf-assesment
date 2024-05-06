import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getCountry = async () => {
  const response = await axios.get(
    `${base_url}search?country=United%20Arab%20Emirates`
  );
  localStorage.setItem("countries", JSON.stringify(response.data));
  return response.data;
};

const searchService = {
  getCountry
};

export default searchService;
