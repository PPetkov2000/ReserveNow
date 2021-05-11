const Reviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <h2 className="reviews-title">Reviews</h2>
      {reviews.slice(0, 5).map((review) => (
        <div key={review._id} className="review">
          <h4 className="review-title">
            {review.reviewer_name}{" "}
            <span className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </h4>
          <p className="review-text">{review.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
