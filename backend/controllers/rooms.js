const roomsDAO = require("../dao/rooms");

const getRooms = async (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const roomsPerPage = req.query.roomsPerPage
    ? Number(req.query.roomsPerPage)
    : 10;
  const filters = {};
  Object.assign(filters, req.query);
  const { roomsList, totalRooms } = await roomsDAO.getRooms({
    filters,
    page,
    roomsPerPage,
  });
  res.json({
    rooms: roomsList,
    total_results: totalRooms,
    entries_per_page: roomsPerPage,
    page,
    filters,
  });
};

const getRoom = async (req, res, next) => {
  try {
    const id = req.params.id || {};
    const room = await roomsDAO.getRoom(id);
    if (!room) {
      return res.json({ message: "Room not Found" });
    }
    res.json(room);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getRooms, getRoom };
