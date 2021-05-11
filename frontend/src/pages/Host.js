const Host = ({ location }) => {
  const state = location.state;

  return (
    <div className="host">
      <h2 className="host-title">{state.host_name}</h2>
      <img
        src={state.host_picture_url}
        alt={state.host_name}
        className="host-image"
      />
      <p className="host-text">
        <strong>Total Listings:</strong> {state.host_total_listings_count}
      </p>
      <p className="host-text">
        <strong>Location:</strong> {state.host_location}
      </p>
      <p className="host-text">
        <strong>Neighbourhood:</strong> {state.host_neighbourhood}
      </p>
      {state.host_response_rate && (
        <p className="host-text">
          <strong>Response Rate:</strong>: {state.host_response_rate}
        </p>
      )}
      {state.host_response_time && (
        <p className="host-text">
          <strong>Response Time:</strong> {state.host_response_time}
        </p>
      )}
      <p className="host-text">
        <strong>About:</strong> {state.host_about}
      </p>
    </div>
  );
};

export default Host;
