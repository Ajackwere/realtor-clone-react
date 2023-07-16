import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFectchedListings, setLastFetchedListing ] = useState(null);
  const params = useParams();

  useEffect(() => {
    // Fetch listings only when the component mounts
    async function fetchListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(8)
      );

      // Timeout promise
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 5000);
      });

      try {
        const querySnap = await Promise.race([getDocs(q), timeoutPromise]);
        const lastVisible = querySnap.docs
        [querySnap.docs.length -1]
        setLastFetchedListing(lastVisible);

        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings.");
      }
    }

    fetchListings();
  }, [params.categoryName]);
  async function onFetchMoreListing(){
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFectchedListings),
        limit(4)
      );

      // Timeout promise
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 5000);
      });

      try {
        const querySnap = await Promise.race([getDocs(q), timeoutPromise]);
        const lastVisible = querySnap.docs
        [querySnap.docs.length -1]
        setLastFetchedListing(lastVisible);

        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings((prevState)=>[...prevState, ...listings]);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings.");
      }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 mb-6 font-bold">
        {params.categoryName === "rent" ? "Places for Rent" : "Places for Sale"}</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFectchedListings && (
            <div className="flex justify-center items-center">
              <button onClick={onFetchMoreListing} className="bg-white px-3 py-2 text-gray-700 border border-gray-300
              mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 
              ease-in-out">Load More</button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}
