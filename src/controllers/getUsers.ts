import url from 'url';
import http from 'http';
import UsersService from '../users';
import { sendSuccessJsonResponse } from '../helpers';

export const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const pathname = url.parse(req.url).pathname;

  if (req.method === 'GET' && pathname === '/api/users') {
    const response = await UsersService.apiGetUsers();
    sendSuccessJsonResponse(res, 200, response);
  }
};

