# WeatherAPItest
 
 This is a RESTful API that represents a survey form for weather data. It allows users to submit information about a city's weather conditions, including the city name, temperature, and description.

Software Requirements
To run this API, you need to have the following software installed on your machine:

Node.js
SQLite
Installation
To install the API, follow these steps:

Clone the repository to your local machine.

Open a terminal window and navigate to the project directory.

Run the following command to install the dependencies:

```npm install```
 
# Run API
To run the API, follow these steps:

Open a terminal window and navigate to the project directory.

Run the following command:
```node app.js```
# Endpoints
The API has the following endpoints:

POST /
This endpoint creates a new form response. The request body must include the city name and description, and optionally the temperature.

Request Body
```{
  "city": "New York",
  "temperature": 20,
  "description": "Sunny"
}```
# GET /{id}

This endpoint retrieves a form response by ID.
```GET /1```


Request URL
```GET /```

Response Body
```[  {    "id": 1,    "city": "New York",    "temperature": 20,    "description": "Sunny"  },  {    "id": 2,    "city": "London",    "temperature": 15,    "description": "Cloudy"  }]```


