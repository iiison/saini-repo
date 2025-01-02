import zodSchema from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { RateSchema, zRateSchema } from "types";

export const rateSchema = zodSchema(zRateSchema)
export const RateModel = model<RateSchema>('Rate', rateSchema)

export const CreateRateFormula = async (
  data: RateSchema
): Promise<RateSchema> => {
  const result = await RateModel.create(data)

  return result
}
