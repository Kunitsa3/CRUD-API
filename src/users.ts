import { UserDetails, User } from './interface';
import { v4 as uuidv4 } from 'uuid';

class UsersService {
  public users: User[];

  constructor() {
    this.users = [];
  }

  async apiGetUsers(): Promise<User[]> {
    return this.users;
  }

  async apiCreateUser(userInformation: UserDetails): Promise<User> {
    const newUserDetails = { ...userInformation, id: uuidv4() };
    this.users.push(newUserDetails);

    return newUserDetails;
  }

  async apiGetUserById(id: string): Promise<User> {
    return this.users.find((user: User) => user.id === id);
  }

  async apiDeleteUser(id: string) {
    return (this.users = this.users.filter((user: User) => user.id !== id));
  }

  async apiUpdateUser(id: string, userDetails: UserDetails) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...userDetails };
      }
      return user;
    });
    return this.users.find((user: User) => user.id === id);
  }
}

export default new UsersService();

