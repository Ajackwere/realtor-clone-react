import { useState } from "react";

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name:"",
        bedrooms: 1,
        bathrooms: 1,
    });
    const { type, name, bedroooms, bathrooms } = formData;
    function onChange(){

    };
  return (
    <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6
        font-bold
        ">Create a Listing</h1>
        <form>
            <p className="text-lg mt-6 font-semibold"> Sell or Rent
            </p>
            <div className="flex">
                <button type="button" id="type" value="sale"
                onClick={onchange} className={`mr-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type=== "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Sell
                </button>
                <button type="button" id="type" value="sale"
                onClick={onchange} className={`ml-3 px-7 py-3
                font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type=== "sell" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}>
                    Rent 
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold"> Name</p>
            <input type="text"
            id="name"
            value={name} onChange={onChange}
            placeholder="Property Name" maxLength="32" minLength="10" required 
            className="w-full px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded transition duration-150
            ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
            <div>
                <div>
                    <p className="text-lg font-semibold">
                        Beds
                    </p>
                    <input type="number" id="bedrooms" value={bedrooms} />
                </div>
            </div>
        </form>
    </main>
  )
}
