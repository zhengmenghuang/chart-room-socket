import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    add(user: User): Promise<User>;
    delete(params: {
        id: string;
    }): Promise<import("typeorm").DeleteResult>;
    getAll(): Promise<User[]>;
    getOne(params: {
        id: string;
    }): Promise<User>;
}
