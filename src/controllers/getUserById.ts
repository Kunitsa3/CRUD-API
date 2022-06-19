import url from 'url';
import http from 'http';
import UsersService from '../users';
import { areUrlsEqual, isUuid, sendErrorResponseWithMessage, sendSuccessJsonResponse } from '../helpers';

export const getUsersById = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const pathname = url.parse(req.url).pathname;
  const { isEqual, params } = areUrlsEqual('/api/users/:userId', pathname);

  if (req.method === 'GET' && isEqual && params) {
    if (isUuid(params)) {
      const response = await UsersService.apiGetUserById(params);
      if (response) {
        sendSuccessJsonResponse(res, 200, response);
      } else {
        sendErrorResponseWithMessage(res, 404, 'User with this id doesn`t exist');
      }
    } else {
      sendErrorResponseWithMessage(res, 400, 'User ID is invalid');
    }
  }
};

