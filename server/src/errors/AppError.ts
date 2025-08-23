export type ErrorMeta = Record<string, unknown>;

export class AppError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly meta?: ErrorMeta;
    constructor(status: number, code: string, message: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

// Common subclasses for clarity
export class ValidationError extends AppError {
    constructor(message = "Request validation failed") {
        super(400, "VALIDATION_FAILED", message);
    }
}
export class AuthError extends AppError {
    constructor(message = "Authentication required") {
        super(401, "UNAUTHORIZED", message);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(403, "FORBIDDEN", message);
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(404, "NOT_FOUND", message);
    }
}
export class RateLimitError extends AppError {
    constructor(message = "Rate limit exceeded") {
        super(429, "RATE_LIMITED", message);
    }
}
export class InternalError extends AppError {
    constructor(message = "Internal server error") {
        super(500, "INTERNAL_ERROR", message);
    }
}