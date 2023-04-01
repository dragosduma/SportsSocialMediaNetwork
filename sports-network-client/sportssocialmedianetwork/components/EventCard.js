import Card from "./Card";
import Address from "./Address";
import Avatar from "./Avatar";
import Link from "next/link";
import EventTime from "./EventTime";

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
  id,
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
      {participants.length > 0 && (
        <div className="mb-2">
          <span className="font-bold">Participants: </span>
          {participants}
        </div>
      )}
      <div className="flex rounded-md overflow-hidden justify-center">
        <img
          src={`/images/${sportTypeImages[sportType]}`}
          alt={sportType}
          className=""
        />
      </div>
    </Card>
  )
}
