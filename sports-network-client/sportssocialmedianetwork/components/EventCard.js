import Card from "./Card";
import Address from "./Address";
import Avatar from "./Avatar";
import Link from "next/link";
import EventTime from "./EventTime";
import { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const sportTypeImages = {
  FOOTBALL: "football.jpg",
  BASKETBALL: "basketball.jpg",
  TABLE_TENNIS: "table-tennis.jpg",
  TENNIS: "tennis.jpg",
  SWIMMING: "swimming.jpg",
  WATCH_PARTY: "watch-party.jpg",
  RUNNING: "running.jpg",
  CYCLING: "cycling.jpg",
};

export default function EventCard({
  eventId,
  username,
  eventName,
  eventDetails,
  eventDuration,
  eventDateTime,
  latitude,
  longitude,
  participants,
  sportType,
  user
}) {

  var splitUsername = "";
  if (username) splitUsername = username.split("@")[0];

  const [isJoining, setIsJoining] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [updatedParticipants, setUpdatedParticipants] = useState([]);

  const getParticipantsNumber = async () => {
    try {
      return axios.get(`http://localhost:8080/events/${eventId}/join`, {
        headers: authHeader()
      })
        .then((response) => {
          setUpdatedParticipants(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await axios
        .post(`http://localhost:8080/events/${eventId}/join`, null, {
          headers: authHeader()
        })
        .then((response) => {
          alert('Succesfully joined! See you there')
          getParticipantsNumber();
        })
    } catch (error) {
      alert('Already joined!')
    } finally {
      setIsJoining(false);
    }
  };

  function handleUserIconClick() {
    setShowParticipants(true);
  }

  function closeParticipants() {
    setShowParticipants(false);
  }

  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Link href={"/profile"}>
            <span className="cursor-pointer">
              <Avatar />
            </span>
          </Link>
        </div>
        <div className="grow">
          <p>
            <Link href={"/profile/"}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {splitUsername}
              </span>
            </Link>
            created an <a className="text-socialBlue">event</a>
            <p>
              in&nbsp;
              <EventTime className="text-gray-500 text-sm" datetime={eventDateTime}>
              </EventTime>
            </p>
          </p>
        </div>
      </div>
      <div className="text-lg font-bold mb-2">{eventName}</div>
      <div className="mb-2">
        <span className="font-bold">Details: </span>
        {eventDetails}
      </div>
      <div className="mb-2">
        <span className="font-bold">Duration: </span>
        {eventDuration}
        <span> hours</span>
      </div>
      {latitude && longitude && (
        <Address latitude={latitude} longitude={longitude} />
      )}
      <div className="flex rounded-md overflow-hidden justify-center">
        <img
          src={`/images/${sportTypeImages[sportType]}`}
          alt={sportType}
          className=""
        />
      </div>
      <div className="flex mt-1 cursor-pointer" onClick={handleUserIconClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        {updatedParticipants == 0
          ?
          <span className="ml-2">{participants.length}</span>
          :
          <span className="ml-2">{updatedParticipants.length}</span>
        }
      </div>
      {showParticipants && (
        <div className="modal">
          <div className="modal-content">
            {(updatedParticipants.length > 0 ? updatedParticipants : participants).map((participant) => (
              <div key={participant.id}>
                <div>{participant.firstName} {participant.lastName}</div>
              </div>
            ))}
            <button
              className="bg-socialBlue text-white px-6 py-1 rounded-md mt-3"
              onClick={closeParticipants}>
              Close
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleJoin}
        disabled={isJoining}
        className="bg-socialBlue text-white px-6 py-1 rounded-md mt-3"
      >
        {isJoining ? 'Joining...' : 'Join'}
      </button>
    </Card>
  )
}
