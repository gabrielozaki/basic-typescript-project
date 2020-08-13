import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/User';
import Department from '../entity/Department';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async createUser(name: string, age: number, department: Department): Promise<User> {
    const user = new User();
    user.name = name;
    user.department = department;
    user.age = age;

    return this.save(user);
  }
}
