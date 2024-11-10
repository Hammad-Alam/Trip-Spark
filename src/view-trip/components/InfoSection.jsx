import image1 from "../../assets/airplane.jpg";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src={image1}
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md">
              📆 {trip.userSelection?.days} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md">
              🥂 No of Traveler: {trip.userSelection?.travelType}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
