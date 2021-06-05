import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRoom } from "../services/rooms";
import Reviews from "../components/Reviews";

const Room = ({ match }) => {
  const roomId = match.params.id;
  const [room, setRoom] = useState({});

  useEffect(() => {
    retrieveRoom(roomId);
  }, [roomId]);

  const retrieveRoom = async (id) => {
    try {
      const { data } = await getRoom(id);
      setRoom(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="room-info">
      <img
        src={room.images && room.images.picture_url}
        alt={room.name}
        className="room-info-image"
      />
      <h2 className="room-info-title">
        {room.name} ({room.property_type})
      </h2>
      <div className="room-info-content">
        <div>
          {room.summary && (
            <p className="room-info-text">
              <strong>Summary:</strong> {room.summary}
            </p>
          )}
          <p className="room-info-text">
            <strong>Amenities:</strong>{" "}
            {room.amenities && room.amenities.join(", ")}
          </p>
          <p className="room-info-text">
            <strong>Owner:</strong>{" "}
            {room.host && (
              <Link
                to={{
                  pathname: `/host/${room.host.host_id}`,
                  state: room.host,
                }}
                className="room-info-link"
              >
                {room.host.host_name}
              </Link>
            )}
          </p>
        </div>
        <div>
          <p className="room-info-text">
            <strong>Address:</strong> {room.address && room.address.street}
          </p>
          <p className="room-info-text">
            <strong>Bedrooms:</strong> <strong>{room.bedrooms}</strong> with{" "}
            <strong>{room.beds}</strong> beds ({room.bed_type})
          </p>
          <p className="room-info-text">
            <strong>Guests:</strong>{" "}
            <strong>
              {room.guests_included && room.guests_included.$numberDecimal}
            </strong>{" "}
            for{" "}
            <strong>
              ${room.extra_people && room.extra_people.$numberDecimal}
            </strong>
          </p>
          <p className="room-info-text">
            <strong>Room Type:</strong> {room.room_type}
          </p>
          <p className="room-info-text">
            <strong>Reviews:</strong> <strong>{room.number_of_reviews}</strong>
          </p>
          {room.house_rules && (
            <p className="room-info-text">
              <strong>Rules:</strong> {room.house_rules}
            </p>
          )}
          <div className="room-info-pricing">
            <h2 className="room-info-pricing-title">Pricing</h2>
            <p className="room-info-pricing-text">
              Price: ${room.price && room.price.$numberDecimal} (
              {room.minimum_nights} nights)
            </p>
            {room.weekly_price && (
              <p className="room-info-pricing-text">
                Weekly Price: $
                {room.weekly_price && room.weekly_price.$numberDecimal}
              </p>
            )}
            {room.monthly_price && (
              <p className="room-info-pricing-text">
                Monthly Price: $
                {room.monthly_price && room.monthly_price.$numberDecimal}
              </p>
            )}
            {room.cleaning_fee && (
              <p className="room-info-pricing-text">
                Cleaning Fee: $
                {room.cleaning_fee && room.cleaning_fee.$numberDecimal}
              </p>
            )}
          </div>
        </div>
      </div>
      {room.reviews && room.reviews.length > 0 && (
        <Reviews reviews={room.reviews} />
      )}
    </div>
  );
};

export default Room;
