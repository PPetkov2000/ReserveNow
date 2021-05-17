import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoomListSortings from "../components/RoomListSortings";
import { getRooms } from "../services/rooms";

const RoomList = ({ match }) => {
  const keyword = match.params.keyword;
  const page = match.params.pageNumber || 1;
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [amenity, setAmenity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (keyword) {
      retrieveRooms("name", keyword, page);
    } else {
      if (propertyType) {
        retrieveRooms("property_type", propertyType, page);
      } else if (amenity) {
        retrieveRooms("amenity", amenity, page);
      } else if (price) {
        retrieveRooms("price", price, page);
      }
    }
  }, [keyword, page, propertyType, amenity, price]);

  console.log(propertyType, amenity, price);

  const retrieveRooms = async (keywordType, keyword, page) => {
    try {
      const { data } = await getRooms(keywordType, keyword, page);
      setRooms(data.rooms);
      setPropertyTypes([...new Set(data.rooms.map((x) => x.property_type))]);
      setAmenities(
        data.rooms
          .map((x) => x.amenities)
          .reduce((acc, curr) => {
            curr.forEach((x) => {
              if (x.startsWith("translation missing")) return;
              if (!acc.includes(x)) {
                acc.push(x);
              }
            });
            return acc;
          }, [])
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RoomListSortings
        propertyTypes={propertyTypes}
        amenities={amenities}
        setPropertyType={setPropertyType}
        setAmenity={setAmenity}
        setPrice={setPrice}
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
