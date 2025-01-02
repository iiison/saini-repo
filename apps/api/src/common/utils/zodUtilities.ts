import { ZodError } from "zod";

export const makeZodValidationErrorObj = (error: ZodError) => {
  return `Invalid inputs: ${error.errors.map((e) => e.message)}`
}
