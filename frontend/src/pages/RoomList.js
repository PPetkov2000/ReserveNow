import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../services/rooms";

const RoomList = ({ match }) => {
  const page = match.params.id ? Number(match.params.id) : 0;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    retrieveRooms(page);
  }, [page]);

  const retrieveRooms = async (page) => {
    try {
      const { data } = await getRooms(page);
      setRooms(data.rooms);
      console.log(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="room-list-wrapper">
      {rooms.map((room) => (
        <div key={room._id} className="room-card">
          <Link to={`/rooms/${room._id}`}>
            <img
              src={room.images.picture_url}
              alt={room.name}
              className="room-card-image"
            />
          </Link>
          <Link to={`/rooms/${room._id}`}>
            <h3 className="room-card-title">{room.name}</h3>
          </Link>
          <p className="room-card-text">
            <strong>Price: ${room.price.$numberDecimal}</strong> for{" "}
            <strong>{room.minimum_nights}</strong> nights
          </p>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
