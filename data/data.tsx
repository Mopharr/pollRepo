import userPP1 from "@/asset/image/user1.png";
import userPP2 from "@/asset/image/user2.png";
import userPP3 from "@/asset/image/user3.png";
import optionImage1 from "@/asset/image/user3.png";
import LeoMessi from "@/asset/image/leo messi.jpeg";
import moment from "moment";
import Image from "next/image";


type OptionType = {
  name: string;
  image: string;
  description: any;
  vote: any;
};

type DataType = {
  userName: string;
  hours: number;
  mainText: string; // Represents a poll question
  description: string;
  likesNo: number;
  commentNo: number; // Number of comments
  viewsNo: number;
  voteNo: number;
  hoursLeft: number;
  id: number; //
  image: string;
  options: OptionType[];
  trendName: string;
  createdAt: string;
  isLegacy?: boolean;
  isExpired?: boolean;
};

const MessiDescription = () => {
  return (
    <div>
      <p>
        Lionel Messi, born on June 24, 1987, in Rosario, Argentina, is one of
        the greatest football players of all time. Messi began his career at a
        young age, joining FC Barcelona's youth academy, La Masia, at 13. He
        made his first-team debut at 16 and quickly established himself as a key
        player. Messi's playing style is characterized by his incredible
        dribbling skills, vision, and scoring ability. Over his career, he has
        won numerous awards, including multiple FIFA World Player of the Year
        titles. Messi has been instrumental in Barcelona's many successes,
        including multiple La Liga and UEFA Champions League titles.
      </p>
      <ul>
        <li>6 Ballon d'Or titles</li>
        <li>10 La Liga titles</li>
        <li>4 UEFA Champions League titles</li>
        <li>7 Copa del Rey titles</li>
        <li>All-time top scorer for FC Barcelona</li>
        <li>All-time top scorer in La Liga</li>
      </ul>
      <Image src={LeoMessi} alt="Lionel Messi" />{" "}
    </div>
  );
};

const generateRandomVotes = (): number => {
  return Math.floor(Math.random() * 100);
};

function generateRandomText(wordCount: any) {
  const words = [
    "the",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "lazy",
    "dog",
    "and",
    "runs",
    "away",
    "with",
    "a",
    "small",
    "cat",
  ];
  let sentence = "";

  for (let i = 0; i < wordCount; i++) {
    sentence += words[Math.floor(Math.random() * words.length)] + " ";
  }

  // Capitalize the first letter and add a period at the end
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).trim() + ".";
}

export const data: DataType[] = [
  {
    userName: "John Doe",
    hours: 5,
    mainText: "Which fruit do you like the most?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: <MessiDescription />,
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Banana",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for Cherry",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 150,
    commentNo: 50,
    viewsNo: 2000,
    voteNo: 5000000,
    hoursLeft: 2,
    id: 1,
    image: userPP1,
    trendName: "Technology",
    createdAt: "2025-09-15",
  },
  {
    userName: "JaneSmith",
    hours: 2,
    mainText: "Which sport do you prefer?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
    ],

    likesNo: 250,
    commentNo: 70,
    viewsNo: 3000,
    voteNo: 650,
    hoursLeft: 4,
    id: 2,
    image: userPP2,
    trendName: "Educstion",
    createdAt: "2029-01-15",
  },
  {
    userName: "AliceW",
    hours: 3,
    mainText: "Favorite season of the year?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 190,
    commentNo: 30,
    viewsNo: 1700,
    voteNo: 4500000,
    hoursLeft: 3,
    id: 3,
    image: userPP2,
    trendName: "Sport",
    createdAt: "2028-04-15",
  },
  // ... Continue in this fashion for other entries:
  {
    userName: "BobM",
    hours: 1,
    mainText: "Preferred mode of transport?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
    ],

    likesNo: 220,
    commentNo: 40,
    viewsNo: 2200,
    voteNo: 5500,
    hoursLeft: 1,
    id: 14,
    image: userPP3,
    trendName: "Football",
    createdAt: "2024-01-15",
  },
  {
    userName: "CharlieZ",
    hours: 4,
    mainText: "Best time of day to work?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 180,
    commentNo: 60,
    viewsNo: 1800,
    voteNo: 480,
    hoursLeft: 5,
    id: 15,
    image: userPP2,
    trendName: "Fashion",
    createdAt: "2023-05-15",
  },
  {
    userName: "DianaY",
    hours: 6,
    mainText: "Your favorite genre of music?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for ee",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for ff",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for rr",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for f",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for ff",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 210,
    commentNo: 55,
    viewsNo: 2300,
    voteNo: 530000,
    hoursLeft: 3,
    id: 10,
    image: userPP1,
    trendName: "Celebrity",
    createdAt: "2023-01-15",
  },
  {
    userName: "EthanX",
    hours: 7,
    mainText: "Ideal vacation spot?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for ff",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for ff",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for xx",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for ff",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for ffs",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 230,
    commentNo: 20,
    viewsNo: 2100,
    voteNo: 5200000,
    hoursLeft: 2,
    id: 19,
    image: userPP2,
    trendName: "Culture",
    createdAt: "2023-04-15",
  },
  {
    userName: "FionaW",
    hours: 8,
    mainText: "Best type of book to read?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for 85868695",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 09485dggd",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for 456",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 45",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for dd",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 98",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 200,
    commentNo: 35,
    viewsNo: 2400,
    voteNo: 5100000,
    hoursLeft: -4,
    id: 13,
    image: userPP1,
    trendName: "Animals",
    createdAt: "2023-09-15",
  },
  {
    userName: "GeorgeV",
    hours: 9,
    mainText: "How do you like your coffee?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for 6743",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for Apple",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for 67",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 5",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 3",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 5",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 250,
    commentNo: 65,
    viewsNo: 2600,
    voteNo: 540000,
    hoursLeft: -1,
    id: 17,
    image: userPP3,
    trendName: "Lifestyle",
    createdAt: "2023-12-15",
  },
  {
    userName: "HannahU",
    hours: 10,
    mainText:
      "What is your preferred device for reading news in today's digital era?",
    description: generateRandomText(100),
    options: [
      {
        name: "Apple",
        image: optionImage1,
        description: "Description for kfhff",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for hfhf",
        vote: generateRandomVotes(),
      },
      {
        name: "Cherry",
        image: optionImage1,
        description: "Description for hfhf",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for djd",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 3",
        vote: generateRandomVotes(),
      },
      {
        name: "Banana",
        image: optionImage1,
        description: "Description for 4",
        vote: generateRandomVotes(),
      },
    ],
    likesNo: 170,
    commentNo: 45,
    viewsNo: 1900,
    voteNo: 4600000,
    hoursLeft: -2,
    id: 90,
    image: userPP1,
    trendName: "Music",
    createdAt: "2027-04-20",
  },
];
const enhanceDataWithAdditionalProperties = (data: DataType[]) => {
  return data.map((poll) => {
    const createdAt = moment(poll.createdAt);
    const isLegacy = moment().diff(createdAt, "years") < 0;
    const isExpired = poll.hoursLeft <= 0;

    return { ...poll, isLegacy, isExpired };
  });
};

// Enhance the data when loading into your application
const enhancedData = enhanceDataWithAdditionalProperties(data);

export default enhancedData;
