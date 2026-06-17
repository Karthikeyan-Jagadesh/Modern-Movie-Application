// Mock Movie Database representing rich movie profiles with watch providers, casting, and trailers.
// Structure mirrors the official TMDB API responses.

export const MOCK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export const MOCK_MOVIES = [
  {
    id: 948713,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    release_date: "2024-02-27",
    runtime: 166,
    vote_average: 8.3,
    vote_count: 4800,
    original_language: "en",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" }
    ],
    genre_ids: [878, 12],
    poster_path: "https://image.tmdb.org/t/p/w500/1pdfxskb2P755LIvHYuwwtHTtKj.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xOMo8j320ZWw6UE06qgCg6T6j6B.jpg",
    trailer_key: "Way9Dexny3w", // Official YouTube trailer key
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" },
          { provider_id: 15, provider_name: "Hulu", logo_path: "/orZCoJ22wL2gH2316e6f1y46j6B.jpg" },
          { provider_id: 1899, provider_name: "Max", logo_path: "/7rw0EsR1143cUIg11n07FS8uA01.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" },
          { provider_id: 10, provider_name: "Amazon Video", logo_path: "/seKK6n64nCSTJu0IH0g1OKvF0Q7.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 122, provider_name: "JioCinema", logo_path: "/n4A4aLymG0N5fB3Qe0Vig9jYj1h.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" },
          { provider_id: 10, provider_name: "Amazon Video", logo_path: "/seKK6n64nCSTJu0IH0g1OKvF0Q7.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 38, provider_name: "NOW", logo_path: "/nKghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://image.tmdb.org/t/p/w185/c4OnB74o2G8J35n96E69n1q4TIE.jpg" },
      { id: 505710, name: "Zendaya", character: "Chani", profile_path: "https://image.tmdb.org/t/p/w185/8G1fmNlJz68A9A2Q5198J2Lp2.jpg" },
      { id: 934273, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "https://image.tmdb.org/t/p/w185/6ik5h4K3001vD1gq5H8G83J3S.jpg" },
      { id: 2505, name: "Austin Butler", character: "Feyd-Rautha Harkonnen", profile_path: "https://image.tmdb.org/t/p/w185/cjLp1WvP24Q8X5eZlq7y18P7.jpg" },
      { id: 1620, name: "Florence Pugh", character: "Princess Irulan", profile_path: "https://image.tmdb.org/t/p/w185/tN2c3BqX4Cj4D7pT1E2m4T1G.jpg" }
    ],
    reviews: [
      { author: "CinemaLover", content: "A cinematic masterpiece. Denis Villeneuve has done it again. The visual scale, the sound design, and the acting are all top-notch.", rating: 10 },
      { author: "SciFiFan99", content: "Incredible adaptation of the second half of the book. Hans Zimmer's score is absolutely mesmerizing.", rating: 9 }
    ]
  },
  {
    id: 872585,
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, showing his leadership of the Manhattan Project and the subsequent political fallout that questioned his loyalty to the United States.",
    release_date: "2023-07-19",
    runtime: 180,
    vote_average: 8.1,
    vote_count: 7500,
    original_language: "en",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" }
    ],
    genre_ids: [18, 36],
    poster_path: "https://image.tmdb.org/t/p/w500/8Gxv2wY6t8jwbPB5Vee7JCY1j4q.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/fm6k01kGJ1j1w8RFLvezR26656Z.jpg",
    trailer_key: "uYPbbksJxIg",
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 384, provider_name: "Peacock", logo_path: "/87rw0EsR1143cUIg11n07FS8uA01.jpg" },
          { provider_id: 15, provider_name: "Hulu", logo_path: "/orZCoJ22wL2gH2316e6f1y46j6B.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" },
          { provider_id: 10, provider_name: "Amazon Video", logo_path: "/seKK6n64nCSTJu0IH0g1OKvF0Q7.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 122, provider_name: "JioCinema", logo_path: "/n4A4aLymG0N5fB3Qe0Vig9jYj1h.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" },
          { provider_id: 10, provider_name: "Amazon Video", logo_path: "/seKK6n64nCSTJu0IH0g1OKvF0Q7.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "https://image.tmdb.org/t/p/w185/llmC294T4C74hD097iJj6U2k.jpg" },
      { id: 5081, name: "Emily Blunt", character: "Kitty Oppenheimer", profile_path: "https://image.tmdb.org/t/p/w185/n62Z9w7883g88cJU4Z9a781V.jpg" },
      { id: 1892, name: "Matt Damon", character: "Leslie Groves", profile_path: "https://image.tmdb.org/t/p/w185/elSl0G9A588B46S8GJU7J.jpg" },
      { id: 113, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "https://image.tmdb.org/t/p/w185/5qU6w788G7w5H9YtJv5v.jpg" },
      { id: 1620, name: "Florence Pugh", character: "Jean Tatlock", profile_path: "https://image.tmdb.org/t/p/w185/tN2c3BqX4Cj4D7pT1E2m4T1G.jpg" }
    ],
    reviews: [
      { author: "ReviewerOne", content: "Cillian Murphy gives the performance of his career. The Trinity test sequence is intense, loud, and breathtaking.", rating: 10 }
    ]
  },
  {
    id: 157336,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    runtime: 169,
    vote_average: 8.4,
    vote_count: 34500,
    original_language: "en",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 18, name: "Drama" },
      { id: 12, name: "Adventure" }
    ],
    genre_ids: [878, 18, 12],
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QGvJW5cx3P8v22Vee4zpxvC.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xJHok7Rj21rso0LGw8chSuK6q5t.jpg",
    trailer_key: "zSWdZVtXT7U",
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/5NyHN4t2jL2gH2316e6f1y46j6B.jpg" },
          { provider_id: 384, provider_name: "Peacock", logo_path: "/87rw0EsR1143cUIg11n07FS8uA01.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" },
          { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/5NyHN4t2jL2gH2316e6f1y46j6B.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 10297, name: "Matthew McConaughey", character: "Cooper", profile_path: "https://image.tmdb.org/t/p/w185/ww6h6zX5eZlq7y18P7.jpg" },
      { id: 1813, name: "Anne Hathaway", character: "Brand", profile_path: "https://image.tmdb.org/t/p/w185/kR3001vD1gq5H8G83J3S.jpg" },
      { id: 83002, name: "Jessica Chastain", character: "Murph", profile_path: "https://image.tmdb.org/t/p/w185/cjLp1WvP24Q8X5eZlq7y18P7.jpg" },
      { id: 3895, name: "Michael Caine", character: "Professor Brand", profile_path: "https://image.tmdb.org/t/p/w185/3ik5h4K3001vD1gq5H8G83J3S.jpg" }
    ],
    reviews: [
      { author: "NolanFanboy", content: "Beautiful, emotional, and scientifically inspired. The organ-heavy score by Hans Zimmer makes you feel like you are in deep space.", rating: 10 }
    ]
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask.",
    overview: "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider-Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders.",
    release_date: "2023-05-31",
    runtime: 140,
    vote_average: 8.4,
    vote_count: 6400,
    original_language: "en",
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    genre_ids: [16, 28, 12, 878],
    poster_path: "https://image.tmdb.org/t/p/w500/8VtB7v9tN6amzwmST13w6SqFSg2.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/4Hodrj24Vjrr1nrbU2iCWw8CICI.jpg",
    trailer_key: "shW9i6k8Mc0",
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" },
          { provider_id: 337, provider_name: "Disney+ Hotstar", logo_path: "/n4A4aLymG0N5fB3Qe0Vig9jYj1h.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/5NyHN4t2jL2gH2316e6f1y46j6B.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 1641030, name: "Shameik Moore", character: "Miles Morales / Spider-Man", profile_path: "https://image.tmdb.org/t/p/w185/ww6h6zX5eZlq7y18P7.jpg" },
      { id: 124747, name: "Hailee Steinfeld", character: "Gwen Stacy / Spider-Woman", profile_path: "https://image.tmdb.org/t/p/w185/kR3001vD1gq5H8G83J3S.jpg" },
      { id: 218399, name: "Oscar Isaac", character: "Miguel O'Hara / Spider-Man 2099", profile_path: "https://image.tmdb.org/t/p/w185/cjLp1WvP24Q8X5eZlq7y18P7.jpg" },
      { id: 1222853, name: "Jake Johnson", character: "Peter B. Parker / Spider-Man", profile_path: "https://image.tmdb.org/t/p/w185/3ik5h4K3001vD1gq5H8G83J3S.jpg" }
    ],
    reviews: [
      { author: "AnimationGeek", content: "Visually, it is one of the most stunning movies ever created. Every frame is a painting. The story is emotional and ends on an epic cliffhanger.", rating: 10 }
    ]
  },
  {
    id: 27205,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who is the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive.",
    release_date: "2010-07-15",
    runtime: 148,
    vote_average: 8.3,
    vote_count: 35000,
    original_language: "en",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" }
    ],
    genre_ids: [28, 878, 12],
    poster_path: "https://image.tmdb.org/t/p/w500/o0j4TCuP1z2iOhwW1D6T2jO6vUa.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/s3TBrRGB1q7jWjLflz61hVdYqye.jpg",
    trailer_key: "YoHD9XEInc0",
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/5NyHN4t2jL2gH2316e6f1y46j6B.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "https://image.tmdb.org/t/p/w185/ww6h6zX5eZlq7y18P7.jpg" },
      { id: 2037, name: "Cillian Murphy", character: "Robert Fischer", profile_path: "https://image.tmdb.org/t/p/w185/llmC294T4C74hD097iJj6U2k.jpg" },
      { id: 19097, name: "Tom Hardy", character: "Eames", profile_path: "https://image.tmdb.org/t/p/w185/cjLp1WvP24Q8X5eZlq7y18P7.jpg" },
      { id: 18050, name: "Elliot Page", character: "Ariadne", profile_path: "https://image.tmdb.org/t/p/w185/3ik5h4K3001vD1gq5H8G83J3S.jpg" },
      { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "https://image.tmdb.org/t/p/w185/tN2c3BqX4Cj4D7pT1E2m4T1G.jpg" }
    ],
    reviews: [
      { author: "Dreamer", content: "A high-concept thriller that keeps you on the edge of your seat. The spinning top is legendary.", rating: 9 }
    ]
  },
  {
    id: 772071,
    title: "Everything Everywhere All at Once",
    tagline: "The universe is so much bigger than you realize.",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    release_date: "2022-03-24",
    runtime: 139,
    vote_average: 7.8,
    vote_count: 5800,
    original_language: "en",
    genres: [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" }
    ],
    genre_ids: [28, 35, 878],
    poster_path: "https://image.tmdb.org/t/p/w500/w3zJ2ILoVXYIzbII5Ug20w2up6.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/tN154C198i6gKvxv6eQW6h2t15x.jpg",
    trailer_key: "wxN1T1uxQ2g",
    watch_providers: {
      US: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      IN: {
        flatrate: [
          { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/5NyHN4t2jL2gH2316e6f1y46j6B.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      },
      GB: {
        flatrate: [
          { provider_id: 8, provider_name: "Netflix", logo_path: "/p194vYJk85p4tVKpC5ICjK2c7.jpg" }
        ],
        rent: [
          { provider_id: 2, provider_name: "Apple TV", logo_path: "/9ghgSC031UB2X4v2tCl6n4W3vjF.jpg" }
        ]
      }
    },
    cast: [
      { id: 16201, name: "Michelle Yeoh", character: "Evelyn Wang", profile_path: "https://image.tmdb.org/t/p/w185/ww6h6zX5eZlq7y18P7.jpg" },
      { id: 23659, name: "Ke Huy Quan", character: "Waymond Wang", profile_path: "https://image.tmdb.org/t/p/w185/llmC294T4C74hD097iJj6U2k.jpg" },
      { id: 12053, name: "Jamie Lee Curtis", character: "Deirdre Beaubeirdre", profile_path: "https://image.tmdb.org/t/p/w185/cjLp1WvP24Q8X5eZlq7y18P7.jpg" },
      { id: 1434316, name: "Stephanie Hsu", character: "Joy Wang", profile_path: "https://image.tmdb.org/t/p/w185/3ik5h4K3001vD1gq5H8G83J3S.jpg" }
    ],
    reviews: [
      { author: "MultiverseTraveler", content: "Original, chaotic, heart-wrenching, and hilariously funny. Ke Huy Quan's performance is incredibly emotional.", rating: 10 }
    ]
  }
];

export const MOCK_LOCAL_TRENDS = {
  IN: [872585, 948713, 27205],
  US: [948713, 569094, 772071],
  GB: [157336, 948713, 569094]
};
