import DepartamentRepository from '../repository/DepartamentRepository';
import UserRepository from '../repository/UserRepository';

export default class DepartamentService {
	departamentRepository = new DepartamentRepository();

	userRepository = new UserRepository()

	public async generateDepartment(): Promise<boolean> {
		try {
			const departament = await this.departamentRepository.createDepartmentByName('TI');
			const gabriel = await this.userRepository.createUser('Gabriel', 29,departament);
			const ozaki = await this.userRepository.createUser('Ozaki', 50 ,departament);
			console.log(gabriel);
			console.log(ozaki);
			const departmentUsers = await departament.users;
			console.log(departmentUsers);

		} catch (e) {
			// Deal with the fact the chain failed
			console.log(e);
		}

		return true;
	}
}
