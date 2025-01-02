import zodSchema from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { Customer, zCustomerSchema } from "types";

const mCustomerSchema = zodSchema(zCustomerSchema)
const Customers = model<Customer>('customer', mCustomerSchema)

mCustomerSchema.index({ name: 1 }, { background: true })
mCustomerSchema.index({ id: 1 }, { background: true, unique: true })
mCustomerSchema.index({ contact: 1 }, { background: true })

export const getCustomersByName = async (
  name: Customer['name'],
): Promise<Customer[] | null> => {
  const result = await Customers.find({ $text: { $search: name }})

  return result
}
