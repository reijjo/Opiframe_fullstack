import axios from "axios";
import { asObject } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = asObject(content);
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (anecdote) => {
  console.log("ACIOS ANECOK", anecdote);
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

export default { getAll, createNew, update };
