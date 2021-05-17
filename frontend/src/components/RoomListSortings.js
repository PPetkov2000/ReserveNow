const RoomListSortings = ({
  propertyTypes,
  amenities,
  setPropertyType,
  setAmenity,
  setPrice,
}) => {
  return (
    <div className="room-list-selects">
      <select
        className="room-list-select"
        defaultValue="default"
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="default" disabled hidden>
          Property Type
        </option>
        {propertyTypes.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <select
        className="room-list-select"
        defaultValue="default"
        onChange={(e) => setAmenity(e.target.value)}
      >
        <option value="default" disabled hidden>
          Amenities
        </option>
        {amenities.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <select
        className="room-list-select"
        defaultValue="default"
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="default" disabled hidden>
          Price
        </option>
        <option value="0-100">0-100</option>
        <option value="100-200">100-200</option>
        <option value="200-300">200-300</option>
        <option value="300-400">300-400</option>
        <option value="400-500">400-500</option>
        <option value="500+">500+</option>
      </select>
    </div>
  );
};

export default RoomListSortings;
