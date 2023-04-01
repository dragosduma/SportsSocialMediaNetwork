import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

export default function Address({ latitude, longitude }) {
  const [address, setAddress] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          setAddress(results[0].formatted_address);
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }, [latitude, longitude, isLoaded]);

  return <div>{address}</div>;
}