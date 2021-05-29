import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoomListSortings from "../components/RoomListSortings";
import { getRooms } from "../services/rooms";

// const sortingCriterias = ["name", "property_type", "amenity", "price"];

const RoomList = ({ match }) => {
  const keyword = match.params.keyword;
  const page = match.params.pageNumber || 1;
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    retrieveRoomsByName();
  }, [keyword]);

  const retrieveRooms = async (keywordType, keyword, page) => {
    try {
      const { data } = await getRooms(keywordType, keyword, page);
      setRooms(data.rooms);
      setPropertyTypes(getPropertyTypes(data));
      setAmenities(getAmenities(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPropertyTypes = (data) => {
    return [...new Set(data.rooms.map((room) => room.property_type))];
  };

  const getAmenities = (data) => {
    return data.rooms
      .map((x) => x.amenities)
      .reduce((acc, curr) => {
        curr.forEach((x) => {
          if (x.startsWith("translation missing")) return;
          if (!acc.includes(x)) {
            acc.push(x);
          }
        });
        return acc;
      }, []);
  };

  const retrieveRoomsByName = () => {
    return retrieveRooms("name", keyword);
  };

  const retrieveRoomsByPropertyType = (propertyType) => {
    return retrieveRooms("property_type", propertyType);
  };

  const retrieveRoomsByAmenity = (amenity) => {
    return retrieveRooms("amenity", amenity);
  };

  const retrieveRoomsByPrice = (price) => {
    return retrieveRooms("price", price);
  };

  return (
    <>
      <RoomListSortings
        propertyTypes={propertyTypes}
        amenities={amenities}
        retrieveRoomsByPropertyType={retrieveRoomsByPropertyType}
        retrieveRoomsByAmenity={retrieveRoomsByAmenity}
        retrieveRoomsByPrice={retrieveRoomsByPrice}
      />
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
    </>
  );
};

export default RoomList;
