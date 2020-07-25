import { EntityRepository, Repository } from 'typeorm';
import Department from '../entity/Department';

@EntityRepository(Department)
export default class DepartamentRepository extends Repository<Department> {
	public async createDepartmentByName(name: string): Promise<Department> {
		const departament = new Department();
		departament.name = name;

		return this.save(departament);
	}

	public async findByName(name: string): Promise<Department[]> {
		return this.find({
			where: {
				name
			}
		});
	}
}
