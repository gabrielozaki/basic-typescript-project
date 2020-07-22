import { getRepository} from 'typeorm';
import Department from '../entity/Department';

export default class DepartamentRepository {
	repository = getRepository(Department)

	public async save(department: Department): Promise<Department> {
		return this.repository.save(department);
	}

	public async createDepartmentByName(name: string): Promise<Department> {
		const departament = new Department();
		departament.name = name;

		return this.repository.save(departament);
	}

	public async findByName(name: string): Promise<Department[]> {
		return this.repository.find({
			where: {
				name
			}
		});
	}
}
