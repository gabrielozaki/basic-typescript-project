import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import Department from './Department';

@Entity()
export default class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		length: 50
	})
	name: string;

	@Column()
	age: number;

	@Column()
	test: number;

	@CreateDateColumn( { name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at'})
	updatedAt: Date;

	@ManyToOne(() => Department, department => department.users, {
		eager: true
	})
	@JoinColumn({ name: 'department_id'})
	department: Department;
}

