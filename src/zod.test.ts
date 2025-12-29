import { describe, expect, it, vi } from "vitest";
import { ZodService } from "./zod-service";
import * as zodLogger from "./zod-logger";
import { ZodError, z } from "zod";

describe("Better Error Handling", () => {

    it("Should not parse error if error parse is turned off ", () => {
        // Spy on the logZodError function to verify logError is called (for metrics)
        const logSpy = vi.spyOn(zodLogger, "logZodError");

        const userSchema = z.object({
            name: z.string()
        })

        const user = {
            name: null
        }

        const zodService = new ZodService({ isParsingEnabled: false, shouldLogErrors: true })

        const result = zodService.safeParse(userSchema, user)
        expect(result.success).toBe(true)

        // Verify that logError was called (logError always runs, and logZodError is called for metrics)
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith(expect.any(ZodError), false)

        // Clean up the spy
        logSpy.mockRestore()
    })

    it("Should parse Error if error parsing is enabled", () => {
        {
            const userSchema = z.object({
                name: z.string()
            })

            const user = {
                name: null
            }

            const zodService = new ZodService({ isParsingEnabled: true, shouldLogErrors: true })


            const result = zodService.safeParse(userSchema, user)
            expect(result.success).toBe(false)
        }
    })


    it("Should log to the console if parsing is enabled", () => {
        // Spy on the logZodError function from the module
        const logSpy = vi.spyOn(zodLogger, "logZodError");

        const userSchema = z.object({
            name: z.string()
        })

        const user = {
            name: null
        }

        const zodService = new ZodService({ isParsingEnabled: true, shouldLogErrors: true })

        zodService.safeParse(userSchema, user)

        // Verify that logError was called (logError always runs, and logZodError is called when shouldLogErrors is true)
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith(expect.any(ZodError), false)

        // Clean up the spy
        logSpy.mockRestore()
    })

    it("Should not log to the console if logging is disabled", () => {
        // Spy on the logZodError function from the module
        const logSpy = vi.spyOn(zodLogger, "logZodError");

        const userSchema = z.object({
            name: z.string()
        })

        const user = {
            name: null
        }

        const zodService = new ZodService({ isParsingEnabled: true, shouldLogErrors: false })

        const result = zodService.safeParse(userSchema, user)
        expect(result.success).toBe(false)

        // Verify that logError was called (it always runs), but logZodError was NOT called (because shouldLogErrors is false)
        expect(logSpy).not.toHaveBeenCalled()

        // Clean up the spy
        logSpy.mockRestore()
    })

    it("Should not log to the console if logging is disabled even when parsing is disabled", () => {
        // Spy on the logZodError function from the module
        const logSpy = vi.spyOn(zodLogger, "logZodError");

        const userSchema = z.object({
            name: z.string()
        })

        const user = {
            name: null
        }

        const zodService = new ZodService({ isParsingEnabled: false, shouldLogErrors: false })

        const result = zodService.safeParse(userSchema, user)
        expect(result.success).toBe(true)

        // Verify that logError was called (it always runs), but logZodError was NOT called (because shouldLogErrors is false)
        expect(logSpy).not.toHaveBeenCalled()

        // Clean up the spy
        logSpy.mockRestore()
    })
})