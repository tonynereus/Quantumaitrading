export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }),
});

export const mockBarData = [
    {
        country: "AD",
        "usdt": 137,
        "usdtColor": "hsl(229, 70%, 50%)",
        btc: 96,
        btcColor: "hsl(296, 70%, 50%)",
        eth: 72,
        ethColor: "hsl(97, 70%, 50%)",
        sol: 140,
        solColor: "hsl(340, 70%, 50%)",
    },
    {
        country: "AE",
        "usdt": 55,
        "usdtColor": "hsl(307, 70%, 50%)",
        btc: 28,
        btcColor: "hsl(111, 70%, 50%)",
        eth: 58,
        ethColor: "hsl(273, 70%, 50%)",
        sol: 29,
        solColor: "hsl(275, 70%, 50%)",
    },
    {
        country: "AF",
        "usdt": 109,
        "usdtColor": "hsl(72, 70%, 50%)",
        btc: 23,
        btcColor: "hsl(96, 70%, 50%)",
        eth: 34,
        ethColor: "hsl(106, 70%, 50%)",
        sol: 152,
        solColor: "hsl(256, 70%, 50%)",
    },
    {
        country: "AG",
        "usdt": 133,
        "usdtColor": "hsl(257, 70%, 50%)",
        btc: 52,
        btcColor: "hsl(326, 70%, 50%)",
        eth: 43,
        ethColor: "hsl(110, 70%, 50%)",
        sol: 83,
        solColor: "hsl(9, 70%, 50%)",
    },
    {
        country: "AI",
        "usdt": 81,
        "usdtColor": "hsl(190, 70%, 50%)",
        btc: 80,
        btcColor: "hsl(325, 70%, 50%)",
        eth: 112,
        ethColor: "hsl(54, 70%, 50%)",
        sol: 35,
        solColor: "hsl(285, 70%, 50%)",
    },
    {
        country: "AL",
        "usdt": 66,
        "usdtColor": "hsl(208, 70%, 50%)",
        btc: 111,
        btcColor: "hsl(334, 70%, 50%)",
        eth: 167,
        ethColor: "hsl(182, 70%, 50%)",
        sol: 18,
        solColor: "hsl(76, 70%, 50%)",
    },
    {
        country: "AM",
        "usdt": 80,
        "usdtColor": "hsl(87, 70%, 50%)",
        btc: 47,
        btcColor: "hsl(141, 70%, 50%)",
        eth: 158,
        ethColor: "hsl(224, 70%, 50%)",
        sol: 49,
        solColor: "hsl(274, 70%, 50%)",
    },
];

export const mockPieData = [
    {
        id: "hack",
        label: "hack",
        value: 239,
        color: "hsl(104, 70%, 50%)",
    },
    {
        id: "make",
        label: "make",
        value: 170,
        color: "hsl(162, 70%, 50%)",
    },
    {
        id: "go",
        label: "go",
        value: 322,
        color: "hsl(291, 70%, 50%)",
    },
    {
        id: "lisp",
        label: "lisp",
        value: 503,
        color: "hsl(229, 70%, 50%)",
    },
    {
        id: "scala",
        label: "scala",
        value: 584,
        color: "hsl(344, 70%, 50%)",
    },
];


export const mockLineData = [
    {
        id: "Gold/USD",
        color: tokens("dark").greenAccent[500],
        data: [
            { x: "January", y: 101 },
            { x: "February", y: 75 },
            { x: "March", y: 36 },
            { x: "April", y: 216 },
            { x: "May", y: 35 },
            { x: "June", y: 236 },
            { x: "July", y: 88 },
            { x: "August", y: 232 },
            { x: "September", y: 281 },
            { x: "October", y: 1 },
            { x: "November", y: 35 },
            { x: "December", y: 14 },
        ],
    },
    {
        id: "AUD/GBP",
        color: tokens("dark").blueAccent[300],
        data: [
            { x: "January", y: 212 },
            { x: "February", y: 190 },
            { x: "March", y: 270 },
            { x: "April", y: 9 },
            { x: "May", y: 75 },
            { x: "June", y: 175 },
            { x: "July", y: 33 },
            { x: "August", y: 189 },
            { x: "September", y: 97 },
            { x: "October", y: 87 },
            { x: "November", y: 299 },
            { x: "December", y: 251 },
        ],
    },
    {
        id: "CAD/USD",
        color: tokens("dark").redAccent[200],
        data: [
            { x: "January", y: 191 },
            { x: "February", y: 136 },
            { x: "March", y: 91 },
            { x: "April", y: 190 },
            { x: "May", y: 211 },
            { x: "June", y: 152 },
            { x: "July", y: 189 },
            { x: "August", y: 152 },
            { x: "September", y: 8 },
            { x: "October", y: 197 },
            { x: "November", y: 107 },
            { x: "December", y: 170 },
        ],
    },
];
export const mockLineData2 = [
    {
        id: "Gold/USD",
        color: tokens("dark").greenAccent[500],
        data: [
            { x: "January", y: 101 },
            { x: "February", y: 205 },
            { x: "March", y: 36 },
            { x: "April", y: 216 },
            { x: "May", y: 35 },
            { x: "June", y: 236 },
            { x: "July", y: 300 },
            { x: "August", y: 212 },
            { x: "September", y: 281 },
            { x: "October", y: 1 },
            { x: "November", y: 35 },
            { x: "December", y: 14 },
        ],
    },
    {
        id: "AUD/GBP",
        color: tokens("dark").blueAccent[300],
        data: [
            { x: "January", y: 212 },
            { x: "February", y: 101 },
            { x: "March", y: 270 },
            { x: "April", y: 10 },
            { x: "May", y: 75 },
            { x: "June", y: 175 },
            { x: "July", y: 33 },
            { x: "August", y: 189 },
            { x: "September", y: 97 },
            { x: "October", y: 87 },
            { x: "November", y: 299 },
            { x: "December", y: 251 },
        ],
    },
    {
        id: "CAD/USD",
        color: tokens("dark").redAccent[200],
        data: [
            { x: "January", y: 191 },
            { x: "February", y: 136 },
            { x: "March", y: 91 },
            { x: "April", y: 190 },
            { x: "May", y: 211 },
            { x: "June", y: 152 },
            { x: "July", y: 189 },
            { x: "August", y: 152 },
            { x: "September", y: 8 },
            { x: "October", y: 197 },
            { x: "November", y: 107 },
            { x: "December", y: 170 },
        ],
    },
];
export const mockLineData3 = [
    {
        id: "Gold/USD",
        color: tokens("dark").greenAccent[500],
        data: [
            { x: "January", y: 101 },
            { x: "February", y: 75 },
            { x: "March", y: 36 },
            { x: "April", y: 216 },
            { x: "May", y: 35 },
            { x: "June", y: 236 },
            { x: "July", y: 88 },
            { x: "August", y: 232 },
            { x: "September", y: 281 },
            { x: "October", y: 1 },
            { x: "November", y: 35 },
            { x: "December", y: 14 },
        ],
    },
    {
        id: "AUD/GBP",
        color: tokens("dark").blueAccent[300],
        data: [
            { x: "January", y: 212 },
            { x: "February", y: 190 },
            { x: "March", y: 270 },
            { x: "April", y: 9 },
            { x: "May", y: 75 },
            { x: "June", y: 175 },
            { x: "July", y: 33 },
            { x: "August", y: 189 },
            { x: "September", y: 97 },
            { x: "October", y: 87 },
            { x: "November", y: 299 },
            { x: "December", y: 251 },
        ],
    },
    {
        id: "CAD/USD",
        color: tokens("dark").redAccent[200],
        data: [
            { x: "January", y: 191 },
            { x: "February", y: 136 },
            { x: "March", y: 91 },
            { x: "April", y: 190 },
            { x: "May", y: 211 },
            { x: "June", y: 152 },
            { x: "July", y: 189 },
            { x: "August", y: 152 },
            { x: "September", y: 8 },
            { x: "October", y: 197 },
            { x: "November", y: 107 },
            { x: "December", y: 170 },
        ],
    },
];



export const mockLineData1 = [
    {
        id: "japan",
        color: tokens("dark").greenAccent[500],
        data: [
            {
                x: "plane",
                y: 101,
            },
            {
                x: "helicopter",
                y: 75,
            },
            {
                x: "boat",
                y: 36,
            },
            {
                x: "train",
                y: 216,
            },
            {
                x: "subway",
                y: 35,
            },
            {
                x: "bus",
                y: 236,
            },
            {
                x: "car",
                y: 88,
            },
            {
                x: "moto",
                y: 232,
            },
            {
                x: "bicycle",
                y: 281,
            },
            {
                x: "horse",
                y: 1,
            },
            {
                x: "skateboard",
                y: 35,
            },
            {
                x: "others",
                y: 14,
            },
        ],
    },
    {
        id: "france",
        color: tokens("dark").blueAccent[300],
        data: [
            {
                x: "plane",
                y: 212,
            },
            {
                x: "helicopter",
                y: 190,
            },
            {
                x: "boat",
                y: 270,
            },
            {
                x: "train",
                y: 9,
            },
            {
                x: "subway",
                y: 75,
            },
            {
                x: "bus",
                y: 175,
            },
            {
                x: "car",
                y: 33,
            },
            {
                x: "moto",
                y: 189,
            },
            {
                x: "bicycle",
                y: 97,
            },
            {
                x: "horse",
                y: 87,
            },
            {
                x: "skateboard",
                y: 299,
            },
            {
                x: "others",
                y: 251,
            },
        ],
    },
    {
        id: "us",
        color: tokens("dark").redAccent[200],
        data: [
            {
                x: "plane",
                y: 191,
            },
            {
                x: "helicopter",
                y: 136,
            },
            {
                x: "boat",
                y: 91,
            },
            {
                x: "train",
                y: 190,
            },
            {
                x: "subway",
                y: 211,
            },
            {
                x: "bus",
                y: 152,
            },
            {
                x: "car",
                y: 189,
            },
            {
                x: "moto",
                y: 152,
            },
            {
                x: "bicycle",
                y: 8,
            },
            {
                x: "horse",
                y: 197,
            },
            {
                x: "skateboard",
                y: 107,
            },
            {
                x: "others",
                y: 170,
            },
        ],
    },
];

export const mockGeographyData = [
    {
        id: "AFG",
        value: 520600,
    },
    {
        id: "AGO",
        value: 949905,
    },
    {
        id: "ALB",
        value: 329910,
    },
    {
        id: "ARE",
        value: 675484,
    },
    {
        id: "ARG",
        value: 432239,
    },
    {
        id: "ARM",
        value: 288305,
    },
    {
        id: "ATA",
        value: 415648,
    },
    {
        id: "ATF",
        value: 665159,
    },
    {
        id: "AUT",
        value: 798526,
    },
    {
        id: "AZE",
        value: 481678,
    },
    {
        id: "BDI",
        value: 496457,
    },
    {
        id: "BEL",
        value: 252276,
    },
    {
        id: "BEN",
        value: 440315,
    },
    {
        id: "BFA",
        value: 343752,
    },
    {
        id: "BGD",
        value: 920203,
    },
    {
        id: "BGR",
        value: 261196,
    },
    {
        id: "BHS",
        value: 421551,
    },
    {
        id: "BIH",
        value: 974745,
    },
    {
        id: "BLR",
        value: 349288,
    },
    {
        id: "BLZ",
        value: 305983,
    },
    {
        id: "BOL",
        value: 430840,
    },
    {
        id: "BRN",
        value: 345666,
    },
    {
        id: "BTN",
        value: 649678,
    },
    {
        id: "BWA",
        value: 319392,
    },
    {
        id: "CAF",
        value: 722549,
    },
    {
        id: "CAN",
        value: 332843,
    },
    {
        id: "CHE",
        value: 122159,
    },
    {
        id: "CHL",
        value: 811736,
    },
    {
        id: "CHN",
        value: 593604,
    },
    {
        id: "CIV",
        value: 143219,
    },
    {
        id: "CMR",
        value: 630627,
    },
    {
        id: "COG",
        value: 498556,
    },
    {
        id: "COL",
        value: 660527,
    },
    {
        id: "CRI",
        value: 60262,
    },
    {
        id: "CUB",
        value: 177870,
    },
    {
        id: "-99",
        value: 463208,
    },
    {
        id: "CYP",
        value: 945909,
    },
    {
        id: "CZE",
        value: 500109,
    },
    {
        id: "DEU",
        value: 63345,
    },
    {
        id: "DJI",
        value: 634523,
    },
    {
        id: "DNK",
        value: 731068,
    },
    {
        id: "DOM",
        value: 262538,
    },
    {
        id: "DZA",
        value: 760695,
    },
    {
        id: "ECU",
        value: 301263,
    },
    {
        id: "EGY",
        value: 148475,
    },
    {
        id: "ERI",
        value: 939504,
    },
    {
        id: "ESP",
        value: 706050,
    },
    {
        id: "EST",
        value: 977015,
    },
    {
        id: "ETH",
        value: 461734,
    },
    {
        id: "FIN",
        value: 22800,
    },
    {
        id: "FJI",
        value: 18985,
    },
    {
        id: "FLK",
        value: 64986,
    },
    {
        id: "FRA",
        value: 447457,
    },
    {
        id: "GAB",
        value: 669675,
    },
    {
        id: "GBR",
        value: 757120,
    },
    {
        id: "GEO",
        value: 158702,
    },
    {
        id: "GHA",
        value: 893180,
    },
    {
        id: "GIN",
        value: 877288,
    },
    {
        id: "GMB",
        value: 724530,
    },
    {
        id: "GNB",
        value: 387753,
    },
    {
        id: "GNQ",
        value: 706118,
    },
    {
        id: "GRC",
        value: 377796,
    },
    {
        id: "GTM",
        value: 66890,
    },
    {
        id: "GUY",
        value: 719300,
    },
    {
        id: "HND",
        value: 739590,
    },
    {
        id: "HRV",
        value: 929467,
    },
    {
        id: "HTI",
        value: 538961,
    },
    {
        id: "HUN",
        value: 146095,
    },
    {
        id: "IDN",
        value: 490681,
    },
    {
        id: "IND",
        value: 549818,
    },
    {
        id: "IRL",
        value: 630163,
    },
    {
        id: "IRN",
        value: 596921,
    },
    {
        id: "IRQ",
        value: 767023,
    },
    {
        id: "ISL",
        value: 478682,
    },
    {
        id: "ISR",
        value: 963688,
    },
    {
        id: "ITA",
        value: 393089,
    },
    {
        id: "JAM",
        value: 83173,
    },
    {
        id: "JOR",
        value: 52005,
    },
    {
        id: "JPN",
        value: 199174,
    },
    {
        id: "KAZ",
        value: 181424,
    },
    {
        id: "KEN",
        value: 60946,
    },
    {
        id: "KGZ",
        value: 432478,
    },
    {
        id: "KHM",
        value: 254461,
    },
    {
        id: "OSA",
        value: 942447,
    },
    {
        id: "KWT",
        value: 414413,
    },
    {
        id: "LAO",
        value: 448339,
    },
    {
        id: "LBN",
        value: 620090,
    },
    {
        id: "LBR",
        value: 435950,
    },
    {
        id: "LBY",
        value: 75091,
    },
    {
        id: "LKA",
        value: 595124,
    },
    {
        id: "LSO",
        value: 483524,
    },
    {
        id: "LTU",
        value: 867357,
    },
    {
        id: "LUX",
        value: 689172,
    },
    {
        id: "LVA",
        value: 742980,
    },
    {
        id: "MAR",
        value: 236538,
    },
    {
        id: "MDA",
        value: 926836,
    },
    {
        id: "MDG",
        value: 840840,
    },
    {
        id: "MEX",
        value: 353910,
    },
    {
        id: "MKD",
        value: 505842,
    },
    {
        id: "MLI",
        value: 286082,
    },
    {
        id: "MMR",
        value: 915544,
    },
    {
        id: "MNE",
        value: 609500,
    },
    {
        id: "MNG",
        value: 410428,
    },
    {
        id: "MOZ",
        value: 32868,
    },
    {
        id: "MRT",
        value: 375671,
    },
    {
        id: "MWI",
        value: 591935,
    },
    {
        id: "MYS",
        value: 991644,
    },
    {
        id: "NAM",
        value: 701897,
    },
    {
        id: "NCL",
        value: 144098,
    },
    {
        id: "NER",
        value: 312944,
    },
    {
        id: "NGA",
        value: 862877,
    },
    {
        id: "NIC",
        value: 90831,
    },
    {
        id: "NLD",
        value: 281879,
    },
    {
        id: "NOR",
        value: 224537,
    },
    {
        id: "NPL",
        value: 322331,
    },
    {
        id: "NZL",
        value: 86615,
    },
    {
        id: "OMN",
        value: 707881,
    },
    {
        id: "PAK",
        value: 158577,
    },
    {
        id: "PAN",
        value: 738579,
    },
    {
        id: "PER",
        value: 248751,
    },
    {
        id: "PHL",
        value: 557292,
    },
    {
        id: "PNG",
        value: 516874,
    },
    {
        id: "POL",
        value: 682137,
    },
    {
        id: "PRI",
        value: 957399,
    },
    {
        id: "PRT",
        value: 846430,
    },
    {
        id: "PRY",
        value: 720555,
    },
    {
        id: "QAT",
        value: 478726,
    },
    {
        id: "ROU",
        value: 259318,
    },
    {
        id: "RUS",
        value: 268735,
    },
    {
        id: "RWA",
        value: 136781,
    },
    {
        id: "ESH",
        value: 151957,
    },
    {
        id: "SAU",
        value: 111821,
    },
    {
        id: "SDN",
        value: 927112,
    },
    {
        id: "SDS",
        value: 966473,
    },
    {
        id: "SEN",
        value: 158085,
    },
    {
        id: "SLB",
        value: 178389,
    },
    {
        id: "SLE",
        value: 528433,
    },
    {
        id: "SLV",
        value: 353467,
    },
    {
        id: "ABV",
        value: 251,
    },
    {
        id: "SOM",
        value: 445243,
    },
    {
        id: "SRB",
        value: 202402,
    },
    {
        id: "SUR",
        value: 972121,
    },
    {
        id: "SVK",
        value: 319923,
    },
    {
        id: "SVN",
        value: 728766,
    },
    {
        id: "SWZ",
        value: 379669,
    },
    {
        id: "SYR",
        value: 16221,
    },
    {
        id: "TCD",
        value: 101273,
    },
    {
        id: "TGO",
        value: 498411,
    },
    {
        id: "THA",
        value: 506906,
    },
    {
        id: "TJK",
        value: 613093,
    },
    {
        id: "TKM",
        value: 327016,
    },
    {
        id: "TLS",
        value: 607972,
    },
    {
        id: "TTO",
        value: 936365,
    },
    {
        id: "TUN",
        value: 898416,
    },
    {
        id: "TUR",
        value: 237783,
    },
    {
        id: "TWN",
        value: 878213,
    },
    {
        id: "TZA",
        value: 442174,
    },
    {
        id: "UGA",
        value: 720710,
    },
    {
        id: "UKR",
        value: 74172,
    },
    {
        id: "URY",
        value: 753177,
    },
    {
        id: "USA",
        value: 658725,
    },
    {
        id: "UZB",
        value: 550313,
    },
    {
        id: "VEN",
        value: 707492,
    },
    {
        id: "VNM",
        value: 538907,
    },
    {
        id: "VUT",
        value: 650646,
    },
    {
        id: "PSE",
        value: 476078,
    },
    {
        id: "YEM",
        value: 957751,
    },
    {
        id: "ZAF",
        value: 836949,
    },
    {
        id: "ZMB",
        value: 714503,
    },
    {
        id: "ZWE",
        value: 405217,
    },
    {
        id: "KOR",
        value: 171135,
    },
];
