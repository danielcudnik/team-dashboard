import { UserService } from '../user.service';

function mockUserModel() {
    const SequelizeTestHelper = require('utils/test-helper/test-helper').SequelizeTestHelper;
    const users = [
        {
            id: 2,
            username: 'good',
            password: '1234',
            email: 'xyz@abc.com',
            active: 'day'
        }
    ];
    
    SequelizeTestHelper.data = users;

    return SequelizeTestHelper;
}

jest.mock('../user.model', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    User: mockUserModel()
}));

describe('User service', () => {
    const userService = new UserService();

    test('should findAll method return all existing users', async () => {
        const users = await userService.findAll();
        expect(users).toHaveLength(1);
    });

    test('should findOne method return user based on provided query when exist', async () => {
        const user = await userService.findOne({
            where: { email: 'xyz@abc.com' }
        });

        expect(user?.id).toBe(2);
        expect(user?.email).toBe('xyz@abc.com');
        expect(user?.username).toBe('good');
    });

    test('should findOne method return null based on provided query when not exist', async () => {
        const user = await userService.findOne({
            where: { email: 'cba@abc.com' }
        });

        expect(user).toBeNull();
    });

    test('should findById method return user based on provided id when exist', async () => {
        const user = await userService.findById(2);

        expect(user?.id).toBe(2);
        expect(user?.email).toBe('xyz@abc.com');
        expect(user?.username).toBe('good');
    });

    test('should findById method return null based on provided id when not exist', async () => {
        const user = await userService.findById(1);

        expect(user).toBeNull();
    });
});
