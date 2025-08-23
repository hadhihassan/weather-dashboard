import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";


export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    const requestId = (req as any).requestId as string | undefined;
    const isProd = process.env.NODE_ENV === "production";

    // Normalize
    let status = 500;
    let code = "INTERNAL_ERROR";
    let message = "Internal server error";
    let details: any = undefined;

    if (err instanceof AppError) {
        status = err.status;
        code = err.code;
        message = err.message;
        details = err.meta;
    } else if (err && typeof err === "object" && (err as any).status) {
        status = (err as any).status;
        message = (err as any).message || message;
    }

    const payload = {
        status,
        code,
        message,
        details: details ?? (isProd ? undefined : { hint: "See server logs", stack: (err as any)?.stack }),
        requestId,
        timestamp: new Date().toISOString(),
    };
    res.status(status).json(payload);
};