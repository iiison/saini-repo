import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;

  constructor(
    status: ResponseStatus,
    message: string,
    responseObject: T,
    statusCode: number,
  ) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) => {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });
};

export function buildNotFoundServiceResponse(message: string) {
  return new ServiceResponse(
    ResponseStatus.Failed,
    message,
    null,
    StatusCodes.NOT_FOUND,
  );
}

export function buildInternalErrorServiceResponse(message: string) {
  return new ServiceResponse(
    ResponseStatus.Failed,
    message,
    null,
    StatusCodes.NOT_FOUND,
  );
}

export function buildBadReqServiceResponse(message: string) {
  return new ServiceResponse(
    ResponseStatus.Failed,
    message,
    null,
    StatusCodes.BAD_REQUEST,
  );
}

export function buildSuccessServiceResponse<T>(message: string, data: T) {
  return new ServiceResponse(
    ResponseStatus.Success,
    message,
    data,
    StatusCodes.OK,
  );
}
