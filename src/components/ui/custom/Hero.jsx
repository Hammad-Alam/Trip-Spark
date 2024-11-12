import { Button } from "../button";
import { Link } from "react-router-dom";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import ImageSlider from "./ImageSlider";

function Hero() {
  const slides = [
    {
      url: image1,
      title: "ai-trip",
    },
    {
      url: image2,
      title: "trip-planning",
    },
    {
      url: image3,
      title: "aeroplane",
    },
  ];
  return (
    <div className="flex flex-col items-center mx-auto justify-center gap-9">
      <p className="font-extrabold text-[30px] md:text-[40px] lg:text-[50px] text-center mt-16">
        <span className="text-[#e74c3c]">Explore with Ease:</span>
        <br />
        AI-Driven Travel Planning
      </p>
      <p className="text-base md:text-lg lg:text-xl text-gray-500 text-center">
        Your personalized travel concierge, crafting bespoke itineraries
        tailored to your passions and budget.
      </p>

      <Link to={"/create-trip"}>
        <Button className="hover:border-none">Start Planning</Button>
      </Link>

      <div className="w-full h-[200px] md:w-3/4 md:h-[350px] lg:h-[500px] mx-auto my-0 mb-10">
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
}

export default Hero;
