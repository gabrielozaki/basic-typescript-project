import { getRepository} from 'typeorm';
import User from '../entity/User';
import Department from '../entity/Department';

export default class UserRepository {
	repository = getRepository(User)

	public async createUser(name: string,age: number, departament:Department): Promise<User> {
		const user = new User();
		user.name = name;
		user.department = departament;
		user.age = age;

		return this.save(user);
	}

	public async save(user: User): Promise<User> {
		return this.repository.save(user);
	}
}
