import { useState } from "react";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify"

export default function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name:"",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        images: {}
        
    });
    const { type, name, bedrooms, bathrooms, parking,
        furnished, description, address, offer, regularPrice,
        discountedPrice, images, latitude, longitude,
    } = formData;
    function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        // for the files
        if (e.target.files){
            setFormData((prevState)=> ({
                ...prevState,
                images: e.target.files
            }));
        }
        //for the texts/boolean/number
        if(!e.target.files){
            setFormData((prevState)=> ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };
    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        if(discountedPrice >= regularPrice){
            setLoading(false)
            toast.error("Discounted price should be less than regular price");
            return;
        }
        if(images.length > 5){
            setLoading(false);
            toast.error("maximum 5 images allowed")
        }
        let geolocation = {}
        let location
        if(geolocationEnabled){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
            const data = await response.json();
        }
    }
    if(loading){
        return < Spinner />;
    }
  return (
    <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6
        font-bold
        ">
            Create a Listing
        </h1>
        <form onSubmit={onSubmit}>
            <p className="text-lg mt-6 font-semibold"> Sell or Rent
            </p>
            <div className="flex">
                <button type="button"
                id="type"
                value="sale"
                onClick={onChange}
                className={`mr-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type=== "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Sell
                </button>
                <button type="button"
                id="type"
                value="rent"
                onClick={onChange}
                className={`ml-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type=== "sale" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Rent 
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold"> Name</p>
            <input type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Property Name" maxLength="32" minLength="10" required 
            className="w-full px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded transition duration-150
            ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
            <div className="flex space-x-6 justify-start mb-6 ">
                <div>
                    <p className="text-lg font-semibold">
                        Beds
                    </p>
                    <input
                    type="number"
                    id="bedrooms"
                    value={bedrooms} 
                    onChange={onChange}
                    min="1" max="50"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded
                    transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-slate-600 text-center
                    "
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold">
                        Baths
                    </p>
                    <input
                    type="number"
                    id="bathrooms"
                    value={bathrooms} 
                    onChange={onChange}
                    min="1" max="50"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded
                    transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-slate-600 text-center
                    "
                    />
                </div>
            </div>
            <p className="text-lg mt-6 font-semibold"> Parking Spot 
            </p>
            <div className="flex">
                <button type="button"
                id="parking"
                value={true}
                onClick={onChange} className={`mr-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !parking ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Yes
                </button>
                <button type="button"
                id="parking"
                value="false"
                onClick={onChange} className={`ml-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    parking ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    No 
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold"> Furnished
            </p>
            <div className="flex">
                <button type="button"
                id="furnished"
                value={true}
                onClick={onChange}
                className={`mr-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Yes 
                </button>
                <button type="button"
                id="furnished"
                value={false}
                onClick={onChange} className={`ml-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    No  
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold"> Physical Address </p>
            <textarea type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Physical Address"
            required 
            className="w-full px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded transition duration-150
            ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
            {!geolocationEnabled && (
                <div className="flex space-x-6 justify-start mb-5">
                    <div>
                    <p className="text-lg font-semibold">Latitude</p>
                    <input type="number"
                    id="latitude"
                    value={latitude}
                    onChange={onChange}
                    required
                    min= "-90"
                    max="90"
                    className="w-full px-4 py-2 text-xl text-gray-800 
                    bg-white border border-gray-300 rounded transition duration-150
                    ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-800 
                    text-center"
                    />
                    </div>
                    <div>
                    <p className="text-lg font-semibold">Longitude</p>
                    <input type="number"
                    id="longitude"
                    value={longitude}
                    onChange={onChange}
                    required
                    min= "-180"
                    max="180"
                    className="w-full px-4 py-2 text-xl text-gray-800 
                    bg-white border border-gray-300 rounded transition duration-150
                    ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-800 
                    text-center"
                    />
                    </div>
                </div>
            )}
            <p className="text-lg font-semibold"> Description  </p>
            <textarea type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required 
            className="w-full px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded transition duration-150
            ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
            <p className="text-lg font-semibold"> Offer
            </p>
            <div className="flex mb-6">
                <button type="button"
                id="offer"
                value={true}
                onClick={onChange} className={`mr-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Yes 
                </button>
                <button type="button"
                id="offer"
                value={false}
                onClick={onChange} className={`ml-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    No  
                </button>
            </div>
            <div className="flex items-center mb-6">
                <div>
                    <p className="text-lg font-semibold">Regular
                    price</p>
                    <div className="flex w-full justify-center items-center
                    space-x-6">
                        <input type="number" id="regularPrice"
                        value={regularPrice}
                        onChange={onChange}
                        min="40"
                        max="10000000"
                        required
                        className="w-full px-4
                        py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded
                        transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                        focus:border-slate-700 text-center"
                        />
                        {type === "rent" && (
                        <div>
                            <p className="text-md w-full whitespace-nowrap
                            "> $ / Month </p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {offer && (
                <div className="flex justify-start items-center mb-6">
                <div>
                    <p className="text-lg font-semibold">Discounted
                    price</p>
                    <div className="flex w-full justify-center items-center
                    space-x-6">
                        <input type="number"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={onChange}
                        min="10"
                        max="10000"
                        required={offer}
                        className="w-full px-4
                        py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded
                        transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                        focus:border-slate-700 text-center"
                        />
                        {type === "rent" && (
                        <div>
                            <p className="text-md w-full whitespace-nowrap
                            "> $ / Month </p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            )}
            <div className="mb-6">
                <p className="text-lg font-semibold">
                    images
                </p>
                <p className="text-gray-600"> The first image will be the cover (max 5)</p>
                <input type="file"
                id="images"
                onChange={onChange}
                accept=".jpg, .png, .jpeg"
                multiple
                required
                className="w-full px-3 py-1.5 text-gray-700
                bg-white border border-gray-400 rounded
                transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
                />
            </div>
            <button type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm
            uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-900
            focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Create Listing
            </button>
        </form>
    </main>
  );
}