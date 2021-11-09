const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $199",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "$199 to $249",
        "array": [199, 249]
    },
    {
        "_id": 3,
        "name": "$250 to $299",
        "array": [250, 299]
    },
    {
        "_id": 4,
        "name": "$300 to $349",
        "array": [300, 349]
    },
    {
        "_id": 5,
        "name": "More than $350",
        "array": [350, 150000]
    },
]

export {
    continents,
    price
}