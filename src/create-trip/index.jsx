import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Plan your perfect getaway! Please provide your travel preferences, and
        our AI will curate a personalized itinerary to match your style.
      </p>

      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Where are you traveling to?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GLOBAL_PLACE_API_KEY}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
