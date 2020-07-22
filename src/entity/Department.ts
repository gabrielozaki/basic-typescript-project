import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Department {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 200,
	})
	name: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => User, user => user.department)
	users: Promise<User[]>;
}
