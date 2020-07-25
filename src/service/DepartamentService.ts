import DepartmentRepository from '../repository/DepartamentRepository';
import UserRepository from '../repository/UserRepository';
import { getCustomRepository } from 'typeorm';

export default class DepartamentService {

	public async generateDepartment(): Promise<boolean> {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const departmentRepository = getCustomRepository(DepartmentRepository);
			const departament = await departmentRepository.createDepartmentByName('TI');
			const gabriel = await userRepository.createUser('Gabriel', 29,departament);
			const ozaki = await userRepository.createUser('Ozaki', 50 ,departament);
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
