import { getConnection, EntityManager, Transaction, TransactionRepository } from 'typeorm';
import DepartmentRepository from '../repository/DepartamentRepository';
import UserRepository from '../repository/UserRepository';

export default class DepartamentService {
	public async generateDepartment(): Promise<boolean> {
		const userRepository = getConnection().getCustomRepository(UserRepository);
		const departmentRepository = getConnection().getCustomRepository(DepartmentRepository);
		await this.process(userRepository, departmentRepository);
		return true;
	}

	@Transaction()
	// eslint-disable-next-line class-methods-use-this
	public async process(@TransactionRepository() userRepository: UserRepository,
											 @TransactionRepository() departmentRepository: DepartmentRepository): Promise<boolean> {
		const departament = await departmentRepository.createDepartmentByName('TI');

		const gabriel = await userRepository.createUser('Gabriel', 29,departament);
		const ozaki = await userRepository.createUser('Ozaki', 50 ,departament);

		// Throw a error to see this transaction failing
		// throw new Error('Impossible to create department');
		console.log(gabriel);
		console.log(ozaki);
		const departmentUsers = await departament.users;
		console.log(departmentUsers);
		return true;
	}
}
