let rooms = null;

const initDB = async (client) => {
  if (rooms) return;

  try {
    rooms = await client.db("sample_airbnb").collection("listingsAndReviews");
  } catch (error) {
    console.error(
      `Unable to establish a collection handle in roomsDAO: ${error}`
    );
  }
};

const getRooms = async ({
  filters = null,
  page = 0,
  roomsPerPage = 10,
} = {}) => {
  let query;
  const options = {};

  if (filters) {
    if ("name" in filters && filters["name"]) {
      query = { $text: { $search: filters["name"] } };
    } else if ("property_type" in filters) {
      query = { property_type: { $eq: filters["property_type"] } };
    } else if ("beds" in filters) {
      query = { beds: { $eq: Number(filters["beds"]) } };
    } else if ("amenity" in filters) {
      query = { amenities: { $in: [filters["amenity"]] } }; // TODO
    } else if ("price" in filters) {
      const [min, max] = filters["price"].split("-");
      query = {
        price: { $elemMatch: { $numberDecimal: { $gt: min, $lte: max } } },
      };
    }
  }

  let cursor = null;

  try {
    cursor = await rooms.find(query, options);
  } catch (error) {
    console.error(`Unable to issue find command, ${error}`);
    return { roomsList: [], totalRooms: 0 };
  }

  const displayCursor = cursor.limit(roomsPerPage).skip(page * roomsPerPage);

  try {
    const roomsList = await displayCursor.toArray();
    const totalRooms = await rooms.countDocuments(query);
    return { roomsList, totalRooms };
  } catch (error) {
    console.error(
      `Unable to convert cursor to array or problem counting documents, ${error}`
    );
    return { roomsList: [], totalRooms: 0 };
  }
};

const getRoom = async (id) => {
  try {
    return await rooms.findOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initDB,
  getRooms,
  getRoom,
};
