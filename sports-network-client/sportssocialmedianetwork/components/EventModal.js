import { useRecoilState } from "recoil";
import { eventModalState } from "../atom/eventModalAtom";
import Modal from "react-modal";
import { useCallback, useState } from "react";
import ReactDatetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from "moment";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import authHeader from "../services/auth-header";

const containerStyle = {
    width: '350px',
    height: '350px'
};

const center = {
    lat: 46.770874295430005,
    lng: 23.589826221950815
};

export default function EventModal({ onPost }) {
    const [open, setOpen] = useRecoilState(eventModalState)
    const [eventName, setEventName] = useState("");
    const [sportType, setSportType] = useState("");
    const [eventDetails, setEventDetails] = useState("");
    const [eventDateTime, setEventDateTime] = useState(new Date());
    const [eventDuration, setEventDuration] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [showMap, setShowMap] = useState(false);

    const libraries = ['places']

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const handleMarkerDragEnd = (e) => {
        const { latLng } = e;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setLatitude(lat);
        setLongitude(lng);
    };

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
        setShowMap(false);
    }, [])

    var yesterday = moment().subtract(1, 'day');
    var valid = function (current) {
        return current.isAfter(yesterday);
    };

    const handleMap = (e) => {
        e.preventDefault();
        setShowMap(true);
    }

    const data = {
        name: eventName,
        sportType: sportType,
        details: eventDetails,
        eventDateTime: eventDateTime,
        duration: eventDuration,
        latitude: latitude,
        longitude: longitude,
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        return axios
            .post("http://localhost:8080/events", data, {
                headers: authHeader()
            })
            .then((response) => {
                setOpen(false);
                console.log(response.data);
            })
    }

    return (
        <div>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] p-6 relative top-10 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md overflow-sm-scroll"
                    isOpen={open}
                    onRequestClose={() => {
                        setOpen(false);
                    }}
                    ariaHideApp={false}
                >
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleUpload} className='flex flex-col items-center space-y-4'>
                            <div className='relative'>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pr-4 py-1 rounded-md transition focus:ring-2 focus:socialBlue'
                                    placeholder="Name of the event*"
                                    type="text"
                                    id="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required />
                            </div>
                            <div className='relative'>
                                <select
                                    className="border rounded-md"
                                    name="sports"
                                    id="sports"
                                    onChange={(e) => setSportType(e.target.value)}
                                    value={sportType}
                                    required
                                >
                                    <option value="" disabled>Choose sport</option>
                                    <option value="football">Football</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="table_tennis">Table Tennis</option>
                                    <option value="tennis">Tennis</option>
                                    <option value="swimming">Swimming</option>
                                    <option value="watch_party">Watch Party</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                </select>
                            </div>
                            <div className='relative'>
                                <textarea
                                    className='border border-gray-300 outline-none placeholder-gray-400 pr-4 py-1 rounded-md transition focus:ring-2 focus:socialBlue'
                                    placeholder="Event details"
                                    type="text"
                                    value={eventDetails}
                                    onChange={(e) => setEventDetails(e.target.value)}
                                    required />
                            </div>
                            <div className='relative'>
                                <ReactDatetime
                                    isValidDate={valid}
                                    onChange={setEventDateTime}
                                    value={eventDateTime}
                                />
                            </div>
                            <div className='relative'>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pr-4 py-1 rounded-md transition focus:ring-2 focus:socialBlue'
                                    placeholder="Event duration (hours)*"
                                    type="number"
                                    id="eventDuration"
                                    value={eventDuration}
                                    onChange={(e) => setEventDuration(e.target.value)}
                                    required />
                            </div>

                            <button className='bg-socialBlue font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transitio'
                                onClick={handleMap}>Click here to choose a location
                            </button>

                            {isLoaded && showMap ?
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    onLoad={onLoad}
                                    onUnmount={onUnmount}
                                >
                                    <MarkerF
                                        draggable={true}
                                        position={center}
                                        onDragEnd={handleMarkerDragEnd}
                                    />
                                </GoogleMap> : <></>
                            }
                            <button
                                className='bg-socialBlue font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-cyan-500'
                                type='submit'>
                                Create
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
}
