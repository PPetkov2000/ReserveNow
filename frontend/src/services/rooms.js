import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/rooms/",
  headers: {
    "Content-type": "application/json",
  },
});

function getRooms(by = "name", query = "", page = 1) {
  return api.get(`?${by}=${query}&page=${page}`);
}

function getRoom(id) {
  return api.get(id);
}

export { getRooms, getRoom };
