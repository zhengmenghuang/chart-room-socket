import { DeleteResult, Repository } from 'typeorm/index';
import { User } from './user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    add(user: User): Promise<User>;
    delete(id: string): Promise<DeleteResult>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}
