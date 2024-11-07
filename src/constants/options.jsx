export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "😊",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventure",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seeks",
    icon: "👨‍👦‍👦",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💴",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const InterestOptions = {
  categories: [
    {
      id: 1,
      name: "Culture",
      icon: "🖼",
      subInterests: [
        { id: 1, name: "Museums" },
        { id: 2, name: "Historical Landmarks" },
        { id: 3, name: "Local Cuisine" },
        { id: 4, name: "Traditional Music" },
        { id: 5, name: "Festivals" },
      ],
    },
    {
      id: 2,
      name: "Outdoors",
      icon: "🏖",
      subInterests: [
        { id: 6, name: "Hiking" },
        { id: 7, name: "Beaches" },
        { id: 8, name: "National Parks" },
        { id: 9, name: "Water Sports" },
        { id: 10, name: "Skiing" },
      ],
    },
    {
      id: 3,
      name: "Adventure",
      icon: "🪂",
      subInterests: [
        { id: 11, name: "Skydiving" },
        { id: 12, name: "Rock Climbing" },
        { id: 13, name: "White Water Rafting" },
        { id: 14, name: "Zip Lining" },
        { id: 15, name: "Scuba Diving" },
      ],
    },
    {
      id: 4,
      name: "Food and Drink",
      icon: "🍔",
      subInterests: [
        { id: 16, name: "Famous Drinks" },
        { id: 17, name: "Brewery Tours" },
        { id: 18, name: "Food Tours" },
        { id: 19, name: "Coffee Culture" },
        { id: 20, name: "Street Food" },
      ],
    },
    {
      id: 5,
      name: "Urban",
      icon: "🌆",
      subInterests: [
        { id: 21, name: "City Tours" },
        { id: 22, name: "Shopping" },
        { id: 23, name: "Nightlife" },
        { id: 24, name: "Architecture" },
        { id: 25, name: "Street Art" },
      ],
    },
  ],
};

export const AI_PROMPT = "Generate Travel Plan for Location: {location}";
