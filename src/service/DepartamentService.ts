import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import DepartmentRepository from '../repository/DepartamentRepository';
import UserRepository from '../repository/UserRepository';

export default class DepartamentService {

	private manager: EntityManager;

	constructor(manager: EntityManager) {
		this.manager = manager;
	}


	public async generateDepartment(): Promise<boolean> {
		await this.process(this.manager);
		return true;
	}

	@Transaction()
	public async process(@TransactionManager() manager: EntityManager): Promise<boolean> {
		const userRepository = manager.getCustomRepository(UserRepository);
		const departmentRepository = manager.getCustomRepository(DepartmentRepository);

		const departament = await departmentRepository.createDepartmentByName('TI');

		const gabriel = await userRepository.createUser('Gabriel', 29,departament);
		const ozaki = await userRepository.createUser('Ozaki', 50 ,departament);

		// Throw a error to see this transaction failing
		throw new Error('Impossible to create department');
		console.log(gabriel);
		console.log(ozaki);
		const departmentUsers = await departament.users;
		console.log(departmentUsers);
		return true;
	}
}
