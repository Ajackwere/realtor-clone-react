import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState(" ");
  useEffect(() => {
    async function getOwner() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error("Could not get owner data");
      }
    }
    getOwner();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {owner !== null && (
        <div className="flex flex-col w-full ">
          <p className=" ">
            Contact Property Owner {owner.name} for the{" "}
            {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded transition duration-150
              ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-600 "
            ></textarea>
          </div>
          <a href={`mailto:${owner.email}?Subject=${listing.name}&body=${message}`}>
            <button className="py-3 bg-blue-600 text-white rounded text-sm
            uppercase shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg active:bg-blue-900 active:shadow-lg transition duration-150
            ease-in-out w-full text-center mb-6"
            type="button">Send Message</button>
          </a>
        </div>
      )}
    </>
  );
}
