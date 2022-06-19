import http, { RequestListener } from 'http';
import { getUsers } from './controllers/getUsers';
import { getUsersById } from './controllers/getUserById';
import { createUser } from './controllers/createUser';
import { updateUser } from './controllers/updateUser';
import { deleteUser } from './controllers/deleteUser';
import { sendErrorResponseWithMessage } from './helpers';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

const requestListener: RequestListener = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (res.writableEnded) {
      return;
    }
    await getUsers(req, res);
    if (res.writableEnded) {
      return;
    }
    await getUsersById(req, res);
    if (res.writableEnded) {
      return;
    }
    await createUser(req, res);
    if (res.writableEnded) {
      return;
    }
    await updateUser(req, res);
    if (res.writableEnded) {
      return;
    }
    await deleteUser(req, res);
    if (res.writableEnded) {
      return;
    }

    res.end(sendErrorResponseWithMessage(res, 404, 'Non-existent link'));
  } catch (e) {
    res.end(sendErrorResponseWithMessage(res, 500, 'The server encountered an internal error'));
  }
};

const server = http.createServer(requestListener);
export const app = server.listen(port);

