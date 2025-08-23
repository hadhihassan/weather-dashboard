import cors from "cors";

export const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN || "http://localhost:3000",   
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

