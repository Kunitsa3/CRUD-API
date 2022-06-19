import url from 'url';
import http from 'http';
import UsersService from '../users';
import { objectValidation, paramsToObject, sendErrorResponseWithMessage, sendSuccessJsonResponse } from '../helpers';
import { UserDetails } from '../interface';

export const createUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const pathname = url.parse(req.url).pathname;

  if (req.method === 'POST' && pathname === '/api/users') {
    let buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();

    const params =
      req.headers['content-type'] === 'application/json' ? JSON.parse(data) : paramsToObject<UserDetails>(data);

    if (objectValidation(params, ['username', 'age', 'hobbies'])) {
      const response = await UsersService.apiCreateUser(params);

      sendSuccessJsonResponse(res, 201, response);
    } else {
      sendErrorResponseWithMessage(res, 400, 'Not all required fields entered');
    }
  }
};

