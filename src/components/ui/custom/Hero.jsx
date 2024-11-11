import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-auto justify-center gap-9">
      <p className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#e74c3c]">Explore with Ease:</span>
        <br />
        AI-Driven Travel Planning
      </p>
      <p className="text-xl text-gray-500 text-center">
        Your personalized travel concierge, crafting bespoke itineraries
        tailored to your passions and budget.
      </p>

      <Link to={"/create-trip"}>
        <Button className="hover:border-none">Start Planning</Button>
      </Link>
    </div>
  );
}

export default Hero;
