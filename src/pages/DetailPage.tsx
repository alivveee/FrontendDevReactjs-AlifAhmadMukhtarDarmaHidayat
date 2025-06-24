import { Link, useParams } from "react-router";
import StarRating from "../components/StarRating"; // komponen rating bintang
import { useDetailRestaurant } from "../hooks/useDetailRestaurant";
import { getRandomCityCoordinateEmbed } from "../lib";
import { FaArrowLeft } from "react-icons/fa";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useDetailRestaurant(id!);

  if (!data && loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading restaurant details...</p>
      </div>
    );
  }
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load restaurant details</p>
      </div>
    );
  return (
    <div className="px-4 md:px-16 py-8 md:py-12 flex flex-col gap-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="text-base" />
        Back to Home
      </Link>

      {/* Restaurant Name & Rating */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
        <StarRating rating={data.rating || 0} />
        <p className="text-gray-500">Rating: {data.rating}</p>
      </div>

      {/* Map */}
      <div className="w-full h-[300px] rounded-lg overflow-hidden shadow">
        <iframe
          src={getRandomCityCoordinateEmbed()}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>

      {/* Review Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
        <div className="flex flex-col gap-6">
          {data.customerReviews?.length === 0 && (
            <p className="text-gray-500 w-full text-center">No reviews yet.</p>
          )}
          {data.customerReviews?.map((review, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg bg-white shadow border"
            >
              <img
                src={`https://i.pravatar.cc/100?img=${index + 1}`}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-700">
                  {review.name}
                </h3>
                <StarRating
                  rating={+(Math.random() * (5 - 2) + 2).toFixed(1)}
                />
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
