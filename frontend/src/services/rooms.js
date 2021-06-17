import api from "../utils/api-instance";

function getRooms(by = "name", query = "", page = 1) {
  return api.get(`/api/v1/rooms?${by}=${query}&page=${page}`);
}

function getRoom(id) {
  return api.get(`/api/v1/rooms/${id}`);
}

export { getRooms, getRoom };
