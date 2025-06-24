import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

interface StarRatingProps {
  rating: number; // 0 - 5
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-xl text-blue-950">
      {[...Array(fullStars)].map((_, i) => (
        <IoMdStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <IoMdStarHalf key="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <IoMdStarOutline key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default StarRating;
