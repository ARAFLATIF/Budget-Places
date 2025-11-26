"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import BudgetFilter from "@/components/BudgetFilter";
import PlaceCard from "@/components/PlaceCard";

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

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState<number[]>([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    filterPlaces();
  }, [searchQuery, budgetFilter, places]);

  const fetchPlaces = async () => {
    try {
      const response = await fetch("/api/places");
      const data = await response.json();
      setPlaces(data);
      setFilteredPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlaces = () => {
    let filtered = places;

    if (searchQuery) {
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter((place) =>
      budgetFilter.includes(place.priceLevel)
    );

    setFilteredPlaces(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            💰 Budget Places
          </h1>
          <p className="mt-2 text-gray-600">
            Discover affordable spots near you
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="mt-4">
            <BudgetFilter selected={budgetFilter} onChange={setBudgetFilter} />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading places...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold">{filteredPlaces.length}</span> places
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
            {filteredPlaces.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg">
                  No places found. Try adjusting your filters!
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Budget Places © 2024 - Find affordable spots near you
          </p>
        </div>
      </footer>
    </div>
  );
}
