
import { User } from '../types';

const USERS_KEY = 'digikala_users';
const CURRENT_USER_KEY = 'digikala_current_user';

// Helper to get users from localStorage
const getUsers = (): any[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: any[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signUp = async (email: string, password: string): Promise<{ user?: User; error?: string }> => {
    return new Promise(resolve => {
        setTimeout(() => { // Simulate network delay
            const users = getUsers();
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                resolve({ error: 'کاربری با این ایمیل قبلا ثبت‌نام کرده است.' });
            } else {
                // IMPORTANT: In a real app, you must hash the password. Storing plain text is insecure.
                const newUser = { email, password }; 
                const updatedUsers = [...users, newUser];
                saveUsers(updatedUsers);
                
                const userToReturn = { email };
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToReturn));
                resolve({ user: userToReturn });
            }
        }, 500);
    });
};

export const login = async (email: string, password: string): Promise<{ user?: User; error?: string }> => {
    return new Promise(resolve => {
        setTimeout(() => { // Simulate network delay
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                const userToReturn = { email };
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToReturn));
                resolve({ user: userToReturn });
            } else {
                resolve({ error: 'ایمیل یا رمز عبور اشتباه است.' });
            }
        }, 500);
    });
};

export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};
