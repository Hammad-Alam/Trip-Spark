import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  SelectBudgetOptions,
  SelectTravelsList,
  InterestOptions,
  AI_PROMPT,
} from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";

function CreateTrip() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [, setSelectedCity] = useState(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [formData, setFormData] = useState({
    location: "",
    days: "",
    budget: "",
    travelType: "",
    interests: [],
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const countryData = response.data.data;

      const countryNames = countryData.map((country) => country.country);
      const cityNames = countryData.reduce(
        (acc, country) => [
          ...acc,
          ...country.cities.map((city) => ({ city, country: country.country })),
        ],
        []
      );

      if (search.length > 2) {
        const filteredSuggestions = [...countryNames, ...cityNames].filter(
          (name) =>
            typeof name === "string"
              ? name.toLowerCase().includes(search.toLowerCase())
              : name.city.toLowerCase().includes(search.toLowerCase()) ||
                name.country.toLowerCase().includes(search.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };

    fetchCountries();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setActiveSuggestion(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && activeSuggestion < suggestions.length - 1) {
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.key === "ArrowUp" && activeSuggestion > 0) {
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.key === "Enter" && suggestions[activeSuggestion]) {
      const selectedSuggestion = suggestions[activeSuggestion];
      const inputValue =
        typeof selectedSuggestion === "string"
          ? selectedSuggestion
          : `${selectedSuggestion.city}, ${selectedSuggestion.country}`;
      setSearch(inputValue);
      setSelectedCity(suggestions[activeSuggestion]);
      setFormData({ ...formData, location: inputValue });
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setSelectedCity(suggestion);
    setSearch("");
    const inputValue =
      typeof suggestion === "string"
        ? suggestion
        : `${suggestion.city}, ${suggestion.country}`;
    setFormData({ ...formData, location: inputValue });
    setSuggestions([]);
  };

  const handleDaysChange = (e) => {
    setFormData({ ...formData, days: e.target.value });
  };

  const handleBudgetSelect = (budget) => {
    setFormData({ ...formData, budget });
  };

  const handleTravelTypeSelect = (travelType) => {
    setFormData({ ...formData, travelType });
  };

  const handleInterestSelect = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.days || !formData.location) {
      toast("Please fill in the required fields.");
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{days}", formData.days)
      .replace("{travelType}", formData.travelType)
      .replace("{budget}", formData.budget)
      .replace("{interest}", formData.interests)
      .replace("{days}", formData.days);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };

  return (
    <div className="px-5 md:px-32 lg:px-56 xl:px-75 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences ✈🌴
      </h2>
      <p className="mt-3 text-gray-500 text-base md:text-xl">
        Plan your perfect getaway! Please provide your travel preferences, and
        our AI will curate a personalized itinerary to match your style.
      </p>

      <div className="mt-4 md:mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Where are you traveling to?
          </h2>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                handleSearchChange(e);
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type city or country"
            />{" "}
            {suggestions.length > 0 && (
              <ul className="absolute bg-white overflow-y-auto h-48 w-full border-2 border-gray-200 rounded-lg mt-1">
                {suggestions.map((suggestion, index) => {
                  if (typeof suggestion === "string") {
                    return (
                      <li
                        key={suggestion}
                        className={`px-4 py-2 cursor-pointer ${
                          activeSuggestion === index ? "bg-gray-100" : ""
                        } hover:bg-gray-100`}
                        onClick={() => handleSelect(suggestion)}
                      >
                        {suggestion}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={suggestion.city}
                        className={`px-4 py-2 cursor-pointer ${
                          activeSuggestion === index ? "bg-gray-100" : ""
                        } hover:bg-gray-100`}
                        onClick={() => handleSelect(suggestion)}
                      >
                        {suggestion.city}, {suggestion.country}
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <div className="relative">
            <input
              type="number"
              value={formData.days}
              onChange={(e) => handleDaysChange(e)}
              className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex. 7"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget == item.title &&
                  "border-2 border-solid border-[#2E2E2E] shadow-lg"
                }`}
                onClick={() => handleBudgetSelect(item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Select Travel Type</h2>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.travelType == item.people &&
                  "border-2 border-solid border-[#2E2E2E] shadow-lg"
                }`}
                onClick={() => handleTravelTypeSelect(item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Select Your Interests</h2>
          <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {InterestOptions.categories.map((category) => (
              <div
                key={category.id}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.interests.includes(category.name) &&
                  "border-2 border-solid border-[#2E2E2E] shadow-lg"
                }`}
                onClick={() => handleInterestSelect(category.name)}
              >
                <h2 className="text-4xl">{category.icon}</h2>
                <h3 className="font-bold text-lg">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.subInterests.map((subInterest) => (
                    <div key={subInterest.id}>
                      <h2
                        className={`bg-[#2E2E2E] hover:bg-transparent hover:border-2 hover:border-gray-700 hover:text-black transition duration-300 ease-in-out text-white text-sm font-medium px-3 py-1 rounded-full w-fit ${
                          formData.interests.includes(subInterest.name)
                            ? "bg-transparent border-2 border-gray-700"
                            : ""
                        }`}
                      >
                        {subInterest.name}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto justify-center items-center my-10 text-center">
          <Button onClick={handleSubmit}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
