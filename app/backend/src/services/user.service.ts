import Users from '../database/models/Users.model';

export default class UserService {
  constructor(public users = Users) {}

  async getOne(email: string): Promise<Users | null> {
    return this.users.findOne({
      where: {
        email,
      },
    });
  }
}
