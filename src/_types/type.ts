export interface ServerErrorResponse {
    success: boolean;
    response: object;
    error: {
        status: string;
        message: string;
    };
}
