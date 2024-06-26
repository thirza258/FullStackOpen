import axios from "axios";
import { Entry } from "../components/Form";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createDiary = async (object: Entry) => {
    const response = await axios.post<Entry>(baseUrl, object);
    return response.data;
}

export default { getAll, createDiary };