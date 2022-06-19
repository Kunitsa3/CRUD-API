import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
import http from 'http';

export const paramsToObject = <T>(params: string): T => {
  const queries = params.split('&').map(a => a.split('='));
  const result = queries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
  return result as T;
};

export const objectValidation = (object: any, requiredFields: string[]) => {
  return requiredFields.reduce((acc, reqField) => {
    if (object.hasOwnProperty(reqField)) {
      return acc && true;
    } else {
      return false;
    }
  }, true);
};

export const areUrlsEqual = (url: string, pathname: string) => {
  const splitUrl = url.split('/');
  const splitPathname = pathname.split('/');

  return splitUrl.reduce(
    (acc, curr, index) => {
      if (curr === splitPathname[index] && curr[0] !== ':') {
        acc.isEqual = acc.isEqual && true;
      } else {
        if (curr[0] === ':') {
          acc.params = splitPathname[index];
        } else {
          acc.isEqual = false;
        }
      }
      return acc;
    },
    { isEqual: true, params: '' },
  );
};

export const isUuid = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const sendSuccessJsonResponse = <T>(res: http.ServerResponse, statusCode: number, response: T) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify(response));
};

export const sendErrorResponseWithMessage = (res: http.ServerResponse, statusCode: number, message: string) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};

