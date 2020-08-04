import { EntityRepository, Repository } from 'typeorm';
import Department from '../entity/Department';

@EntityRepository(Department)
export default class DepartmentRepository extends Repository<Department> {
	public async createDepartmentByName(name: string): Promise<Department> {
		const department = new Department();
		department.name = name;

		return this.save(department);
	}

	public async findByName(name: string): Promise<Department[]> {
		return this.find({
			where: {
				name
			}
		});
	}
}
