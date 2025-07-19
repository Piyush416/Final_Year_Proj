import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ level: 'debug' });

const interceptRequest = (config, showProgress) => {
  const axiosId = uuidv4();
  showProgress()

  logger.debug('Outbound request', {
    baseUrl: config.baseURL,
    method: config.method,
    data: config.data,
    params: config.params,
    url: config.url,
    headers: config.headers,
    axiosId,
  });

  config.metadata = {
    axiosId: axiosId,
  };

  return config;
};

const interceptSuccessResponse = (response, hideProgress) => {
  logger.debug('Outbound response success', {
    baseUrl: response.config.baseURL,
    url: response.config.url,
    status: `${response.status}:${response.statusText}`,
    headers: response.headers,
    body: response.data,
    axiosId: response.config.metadata?.axiosId,
  });

  //hideLoader();
  hideProgress();
  return response;
};

const interceptErrorResponse = (error, hideProgress) => {
  if (error.response) {
    const config = error.response.config || {};
    logger.debug('Outbound response failure', {
      baseUrl: config.baseURL,
      url: config.url,
      status: error.response.status,
      headers: error.response.headers,
      body: error.response.data,
      axiosId: config.metadata?.axiosId,
    });
  } else {
    logger.debug('Axios error without response:', { message: error.message });
  }

//   hideLoader();
    hideProgress();
  return Promise.reject(error);
};

export const createAxiosInstance = (showProgress, hideProgress) => {
  const baseURL = 'http://localhost:3000';

  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => interceptRequest(config, showProgress));
  instance.interceptors.response.use(
    (response) => interceptSuccessResponse(response, hideProgress),
    (error) => interceptErrorResponse(error, hideProgress)
  );

  return instance;
};
