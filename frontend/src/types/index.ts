export interface WeatherResponse {
    location: string;
    temperature: number;
    condition: string;
    forecast: Array<{
        date: string;
        temperature: number;
        condition: string;
    }>;
}

export interface City {
    name: string;
    country: string;
    id: string;
}

export interface User {
    _id: string,
    username: string;
    email: string;
    password: string;
    favoriteCities: string[];
    createdAt: Date;
    updatedAt: Date;
}