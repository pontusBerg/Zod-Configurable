import { ZodError, z } from "zod";
import { logZodError } from "./zod-logger";

interface ZodServiceConfig {
    isParsingEnabled: boolean;
    shouldLogErrors: boolean;
}

export class ZodService {
    private isParsingEnabled: boolean;
    private shouldLogErrors: boolean;

    constructor(config: ZodServiceConfig) {
        this.isParsingEnabled = config.isParsingEnabled;
        this.shouldLogErrors = config.shouldLogErrors;
    }

    private logError = (error: unknown) => {
        if (error instanceof ZodError && this.shouldLogErrors) {
            logZodError(error);
        }
    };

    parse = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => {
        if (!this.isParsingEnabled) {
            // Type assertion when parsing is disabled - use with caution
            return data as z.infer<T>;
        }

        try {
            return schema.parse(data);
        } catch (error) {
            this.logError(error);
            throw error
        }
    };

    safeParse = <T extends z.ZodType>(
        schema: T,
        data: unknown
    ): { success: true; data: z.infer<T> } | { success: false; error: ZodError } => {
        if (!this.isParsingEnabled) {
            // When parsing is disabled, return success without validation
            // This is unsafe but matches the intended behavior
            return {
                success: true,
                data: data as z.infer<T>,
            };
        }

        const response = schema.safeParse(data);
        if (!response.success) {
            this.logError(response.error);
        }
        return response;
    };
}


