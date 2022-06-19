import url from 'url';
import http from 'http';
import UsersService from '../users';
import { areUrlsEqual, isUuid, sendErrorResponseWithMessage } from '../helpers';

export const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const pathname = url.parse(req.url).pathname;
  const { isEqual, params } = areUrlsEqual('/api/users/:userId', pathname);

  if (req.method === 'DELETE' && isEqual) {
    if (isUuid(params)) {
      const response = await UsersService.apiDeleteUser(params);
      if (response) {
        res.statusCode = 204;
        res.end();
      } else {
        sendErrorResponseWithMessage(res, 404, 'User with this id doesn`t exist');
      }
    } else {
      sendErrorResponseWithMessage(res, 400, 'User ID is invalid');
    }
  }
};

