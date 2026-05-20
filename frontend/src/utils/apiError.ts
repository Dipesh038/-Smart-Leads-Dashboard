import axios from "axios";

type ApiErrorData = {
  message?: string;
};

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorData>(error)) {
    return error.response?.data?.message ?? fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const isForbiddenError = (error: unknown) => {
  return axios.isAxiosError(error) && error.response?.status === 403;
};
