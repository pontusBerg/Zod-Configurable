import { ZodError } from "zod";

/**
 * Logs Zod validation errors to the console with styled formatting
 * @param error - The ZodError to log
 * @param isSilenced - Whether this error is silenced (logged but not shown to user)
 */
export const logZodError = (error: ZodError, isSilenced: boolean = false): void => {
    // Main error header with styling
    const headerText = isSilenced ? "🔇 Silenced Zod Validation Error" : "❌ Zod Validation Error";
    const headerColor = isSilenced ? "#ffaa44" : "#ff4444";
    console.groupCollapsed(
        `%c${headerText}`,
        `color: ${headerColor}; font-weight: bold; font-size: 14px;`
    );

    // Error message
    console.log(
        "%cMessage:",
        "color: #ff6666; font-weight: bold;",
        error.message
    );

    // List issues in a readable format
    if (error.issues.length > 0) {
        console.log(
            "%cIssues:",
            "color: #ff6666; font-weight: bold; margin-top: 8px;"
        );
        error.issues.forEach((issue, index) => {
            const path = issue.path.join(".") || "(root)";
            const pathStyle = "color: #ff8888; font-weight: bold;";

            if (issue.code === "invalid_type" && "expected" in issue && "received" in issue) {
                console.log(
                    `%c[${index + 1}] ${path}%c\n   Code: ${issue.code}\n   Expected: ${issue.expected}\n   Received: ${issue.received}\n   Message: ${issue.message}`,
                    pathStyle,
                    "color: inherit;"
                );
            } else {
                console.log(
                    `%c[${index + 1}] ${path}%c\n   Code: ${issue.code}\n   Message: ${issue.message}`,
                    pathStyle,
                    "color: inherit;"
                );
            }
        });
    }


    console.groupEnd();
};

