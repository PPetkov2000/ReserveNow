import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/rooms/",
  headers: {
    "Content-type": "application/json",
  },
});

function getRooms(page = 0) {
  return api.get(`?page=${page}`);
}

function getRoom(id) {
  return api.get(id);
}

function findRoom(query, by = "name", page = 0) {
  return api.get(`?${by}=${query}&page=${page}`);
}

export { getRooms, getRoom, findRoom };
