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
        if (!this.shouldLogErrors) {
            return;
        }

        if (error instanceof ZodError) {
            logZodError(error, false);
            return;
        }

        console.log(error);
    };

    parse = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => {
        try {
            return schema.parse(data);
        } catch (error) {
            this.logError(error);

            if (this.isParsingEnabled) {
                throw error;
            }
            // Type assertion when parsing is disabled - use with caution
            return data as z.infer<T>;
        }
    };

    safeParse = <T extends z.ZodType>(
        schema: T,
        data: unknown
    ): { success: true; data: z.infer<T> } | { success: false; error: ZodError } => {
        const response = schema.safeParse(data);

        if (response.success) {
            return response;
        }

        this.logError(response.error);

        if (!this.isParsingEnabled) {
            // When parsing is disabled, return success without validation
            // This is unsafe but matches the intended behavior
            return {
                success: true,
                data: data as z.infer<T>,
            };
        }

        return response;
    };
}