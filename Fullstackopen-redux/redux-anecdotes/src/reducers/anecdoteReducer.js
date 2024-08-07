import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id == id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : changedAnecdote));
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log("thunk ane", anecdotes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (anecdote) => {
  console.log("UUSINä", anecdote);
  const toVote = { ...anecdote, votes: anecdote.votes + 1 };

  return async (dispatch) => {
    console.log("TO VOTE", toVote.id);
    const voted = await anecdoteService.update(toVote);
    console.log("VOTED", voted);
    dispatch(voteAnecdote(voted.id));
  };
};

export default anecdoteSlice.reducer;
