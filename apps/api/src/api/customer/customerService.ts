import { Customer } from "types";
import { ServiceResponse, buildInternalErrorServiceResponse, buildNotFoundServiceResponse, buildSuccessServiceResponse } from "../../common/models/serviceResponse";
import { getCustomersByName } from "./customerModel";

export const customerService = {
  findCustomer: async (
    query: string
  ): Promise<ServiceResponse<Customer[] | null>> => {
    try {
      const customers = await getCustomersByName(query)

      if (!customers) {
        return buildNotFoundServiceResponse(`No customers found: ${query}`)
      }

      return buildSuccessServiceResponse('found customers', customers)
    } catch(error) {
      const errorMsg = `Error finding customers: ${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  }
}
