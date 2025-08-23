
# Weather Dashboard - MERN + TypeScript + Redux

A comprehensive weather dashboard application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring TypeScript and Redux for state management.

## 🌟 Features

- **User Authentication**: Secure login/registration with JWT
- **Multi-City Weather**: View current weather for multiple cities
- **5-Day Forecast**: Detailed 5-day weather forecast
- **Favorite Cities**: Save and manage favorite locations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Caching**: Reduces API calls with efficient caching

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **TailwindCSS** for styling
- **Axios** for API calls
- **React Router** for navigation
- **React Icons** for UI icons

### Backend
- **Node.js** with Express.js and TypeScript
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **axios** for weather API calls
- **node-cache** for in-memory caching
- **express-rate-limit** for API rate limiting

### APIs Used
- **OpenWeatherMap API** for weather data and weather icons

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenWeatherMap API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weather-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/weather-dashboard
JWT_SECRET=your_jwt_secret_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
WEATHER_API_URL=your_openweather_base_url
CORS_ORIGIN=your_client_base_url
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm start
```

### 4. Database Setup
Ensure MongoDB is running on your system or use MongoDB Atlas.

## 📖 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "favoriteCities": []
  }
}
```

#### POST /api/auth/login
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** 
```json
{
  "token":"token"
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "favoriteCities": []
  }
}
```

### Weather Endpoints

#### GET /api/weather/full/:city
Get searched weather for a city and 5 day's forecast data(requires authentication).

**Response:**
```json
{
    "currentWeather": {
        "city": "city",
        "country": "IN",
        "temperature": 29.39,
        "feelsLike": 33.39,
        "humidity": 69,
        "windSpeed": 3.51,
        "description": "overcast clouds",
        "icon": "04d",
        "timestamp": "2025-08-23T07:36:00.660Z"
    },
    "forecast": {
        "city": "city",
        "country": "IN",
        "forecasts": [
            {
                "date": "2025-08-23 12:00:00",
                "temperature": 28.99,
                "feelsLike": 32.71,
                "humidity": 70,
                "windSpeed": 2.71,
                "description": "overcast clouds",
                "icon": "04d"
            },
        ],
        "timestamp": "2025-08-23T07:36:00.836Z"
    }
}
```

#### GET /api/weather/addedWeathersFull
Get all user added city weather and forecast data (requires authentication).

**Response:**
```json
[
    {
        "city": "city",
        "currentWeather": {
            "city": "city",
            "country": "IN",
            "temperature": 29.39,
            "feelsLike": 33.39,
            "humidity": 69,
            "windSpeed": 3.51,
            "description": "overcast clouds",
            "icon": "04d",
            "timestamp": "2025-08-23T07:36:00.660Z"
        },
        "forecast": {
            "city": "city",
            "country": "IN",
            "forecasts": [
                {
                    "date": "2025-08-23 12:00:00",
                    "temperature": 28.99,
                    "feelsLike": 32.71,
                    "humidity": 70,
                    "windSpeed": 2.71,
                    "description": "overcast clouds",
                    "icon": "04d"
                },
            ],
            "timestamp": "2025-08-23T07:36:00.836Z"
        }
    }
]
```

### User Endpoints

#### GET /api/user/profile
Get user profile (requires authentication).

**Request Body:**
```json
{
  "username" : "user",
  "email":"user@gmail.com",
  "favoriteCities" : []
  "createdAt": Date;
  "updatedAt": Date;
}
```

#### POST /api/user/favorites
Add city to favorites (requires authentication).

**Request Body:**
```json
{
  "favoriteCities": ["London"]
}
```

#### DELETE /api/user/favorites/:city
Remove city from favorites (requires authentication).

**Request Body:**
```json
{
   "message": 'City removed',
   "favoriteCities": []
}
```

#### GET /api/user/favorites
Get favorite cities (requires authentication).

**Request Body:**
```json
{
  "favoriteCities": ["London"]
}
```

## 🧩 Tech Stack Choices Explanation

### Why TypeScript?
- **Type Safety**: Catches errors at compile time rather than runtime
- **Better Developer Experience**: Enhanced autocomplete and IntelliSense
- **Easier Refactoring**: Type definitions make large codebases more maintainable
- **Improved Collaboration**: Clear interfaces between components and modules

### Why Redux Toolkit?
- **Simplified Redux**: Reduces boilerplate code significantly
- **Immutability Handling**: Built-in Immer.js for easy state updates
- **RTK Query**: Powerful data fetching and caching solution
- **DevTools Integration**: Excellent debugging capabilities

### Why TailwindCSS?
- **Utility-First Approach**: Rapid UI development without writing custom CSS
- **Responsive Design**: Built-in responsive modifiers
- **Consistency**: Design system enforcement through configuration
- **Performance**: Small bundle size through PurgeCSS

### Why MongoDB?
- **Flexible Schema**: Easy to adapt to changing requirements
- **JSON-like Documents**: Natural fit with JavaScript/Node.js
- **Scalability**: Horizontal scaling through sharding
- **Geospatial Queries**: Built-in support for location-based queries

## 🎯 Assumptions Made

1. **User Authentication**: Simple email/password auth is sufficient for this application
2. **Weather Data**: OpenWeatherMap API provides accurate and reliable data
3. **Caching Strategy**: 10-minute cache expiration balances freshness with API limits
4. **Error Handling**: Generic error messages for security
5. **UI Requirements**: Responsive design is prioritized for mobile and desktop usage
6. **Data Persistence**: User preferences are more important than historical weather data

## ⚠️ Known Limitations

1. **API Rate Limiting**: OpenWeatherMap free tier has daily request limits
2. **Weather Data Accuracy**: Limited control over data quality from third-party API
3. **Limited Historical Data**: Only current and forecast data available
4. **Image Optimization**: Weather icons are loaded from external source

## 🔮 Future Improvements

1. **Social Login**: Add OAuth integration (Google, Facebook, etc.)
2. **Push Notifications**: Weather alerts for saved locations
3. **Advanced Forecasting**: Add hourly forecasts and more detailed data
4. **Real Time weather updates** : add real time connection for real time weather updates
5. **Interactive Maps**: Visual weather data representation
6. **Multiple Units Support**: Switch between Celsius/Fahrenheit
7. **Theme Support**: Light/dark mode toggle
8. **Image Caching**: Cache weather icons locally

