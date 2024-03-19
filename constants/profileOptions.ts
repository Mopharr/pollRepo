type Options = {
  gender: string[];
  income: string[];
  education: string[];
  ethnicity: string[];
  marital_status: string[];
  employment_status: string[];
  occupation: string[];
  fav_sport: string[];
  hobbies: string[];
  fav_music: string[];
  dietary_pref: string[];
  physical_level: string[];
  fav_book: string[];
  social_media_usage: string[];
  fav_movie: string[];
  travel_freq: string[];
  pet_ownership: string[];
};

export const options: Options = {
  gender: ["Male", "Female", "Non-Binary", "Prefer Not to Say"],

  income: [
    "Under $20,000",
    "$20,000 to $39,999",
    "$40,000 to $59,999",
    "$60,000 to $79,999",
    "$80,000 to $99,999",
    "Over $100,000",
    "Prefer Not to Say",
  ],

  education: [
    "Some High School",
    "High School Graduate",
    "Some College",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate or Higher",
    "Prefer Not to Say",
  ],
  //   HAS OTHERS
  ethnicity: [
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native American or Alaska Native",
    "White",
    "Two or More Races",
    "Prefer Not to Say",
  ],

  marital_status: [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
    "Prefer Not to Say",
  ],

  employment_status: [
    "Employed Full-Time",
    "Employed Part-Time",
    "Self-Employed",
    "Unemployed",
    "Retired",
    "Student",
    "Unable to Work",
    "Prefer Not to Say",
  ],

  occupation: [
    "Administration & Office Support",
    "Arts, Design, Entertainment, Sports, and Media",
    "Business & Financial Operations",
    "Community & Social Service",
    "Construction & Extraction",
    "Education, Training, & Library",
    "Farming, Fishing, & Forestry",
    "Food Preparation & Serving Related",
    "Healthcare Practitioners & Technical",
    "Healthcare Support",
    "Information Technology",
    "Legal",
    "Maintenance & Repair",
    "Management",
    "Manufacturing & Warehouse",
    "Personal Care & Service",
    "Real Estate",
    "Retail",
    "Sales",
    "Science & Engineering",
    "Transportation & Material Moving",
  ],

  //   HAS OTHER
  fav_sport: [
    "Basketball",
    "Soccer/Football",
    "Baseball",
    "Tennis",
    "Golf",
    "Running/Athletics",
    "Swimming",
    "Prefer Not to Say",
  ],

  hobbies: [
    "Reading",
    "Traveling",
    "Cooking/Baking",
    "Sports",
    "Arts and Crafts",
    "Gaming",
    "Music",
    "Photography",
    "Gardening",
  ],

  fav_music: [
    "Pop",
    "Rock",
    "Jazz",
    "Classical",
    "Hip-Hop/Rap",
    "Electronic/Dance",
    "Country",
    "K-Pop",
    "R&B/Soul",
    "Metal",
    "Reggae",
    "Prefer Not to Say",
  ],

  dietary_pref: [
    "Omnivore",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-Free",
    "Keto",
    "Halal",
    "Kosher",
    "Prefer Not to Say",
  ],

  physical_level: [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Super Active",
    "Prefer Not to Say",
  ],

  fav_book: [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Horror",
    "Biography",
    "Self-help",
  ],

  social_media_usage: [
    "None",
    "Less than an hour per day",
    "1-3 hours per day",
    "3-5 hours per day",
    "More than 5 hours per day",
  ],

  fav_movie: [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Documentary",
  ],

  travel_freq: [
    "Never",
    "Once a year",
    "2-3 times a year",
    "4-5 times a year",
    "More than 5 times a year",
  ],

  pet_ownership: ["No pets", "Dog(s)", "Cat(s)", "Fish", "Bird(s)"],
};

export type OptionalFields = {
  id: string;
  option: string;
};

export const demographicsKey: string[] = [
  "gender",
  "income",
  "education",
  "ethnicity",
  "marital_status",
  "birth_date",
  "country",
  "city",
  "state",
  "employment_status",
  "occupation",
  "fav_sport",
  "hobbies",
  "fav_music",
  "dietary_pref",
  "physical_level",
  "fav_book",
  "social_media_usage",
  "fav_movie",
  "travel_freq",
  "pet_ownership",
];
export const optionalFields: OptionalFields[] = [
  {
    id: "fav_sport",
    option: "Favorite sport",
  },

  {
    id: "hobbies",
    option: "Hobbies",
  },

  {
    id: "fav_music",
    option: "Favorite music genre",
  },
  {
    id: "dietary_pref",
    option: "Dietary preferences",
  },
  {
    id: "physical_level",
    option: "Physical activity level",
  },

  {
    id: "fav_book",
    option: "Favorite book genre",
  },
  {
    id: "social_media_usage",
    option: "Social media usage",
  },

  {
    id: "fav_movie",
    option: "Preferred movie genre",
  },

  {
    id: "travel_freq",
    option: "Travel frequency",
  },
  {
    id: "pet_ownership",
    option: "Pet ownership",
  },
];
