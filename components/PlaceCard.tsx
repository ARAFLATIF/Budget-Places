interface Place {
  id: string;
  name: string;
  category: string;
  priceLevel: number;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  description: string;
}

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const priceSymbol = "$".repeat(place.priceLevel);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{place.name}</h3>
          <span className="text-green-600 font-bold text-lg">{priceSymbol}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{place.category}</p>
        
        <p className="text-gray-700 text-sm mb-4">{place.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-semibold">{place.rating}</span>
            <span className="text-gray-500 ml-1">({place.reviews})</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-1">📍</span>
            <span>{place.distance}</span>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
