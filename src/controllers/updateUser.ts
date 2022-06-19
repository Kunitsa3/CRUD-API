import url from 'url';
import http from 'http';
import UsersService from '../users';
import {
  areUrlsEqual,
  isUuid,
  paramsToObject,
  sendErrorResponseWithMessage,
  sendSuccessJsonResponse,
} from '../helpers';
import { UserDetails } from '../interface';

export const updateUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const pathname = url.parse(req.url).pathname;
  const { isEqual, params } = areUrlsEqual('/api/users/:userId', pathname);

  if (req.method === 'PUT' && isEqual) {
    let buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const queries = paramsToObject<UserDetails>(data);

    if (isUuid(params)) {
      const response = await UsersService.apiUpdateUser(params, queries);
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

