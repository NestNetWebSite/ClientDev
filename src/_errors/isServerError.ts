import axios, { AxiosError } from 'axios';
import { ServerErrorResponse } from '../_types/type';

export default function isServerError(error: unknown): error is AxiosError<ServerErrorResponse> {
    return axios.isAxiosError(error);
}
