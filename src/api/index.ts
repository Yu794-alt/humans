import {User} from "../types/types";

export interface ApiResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

const API_BASE_URL = 'https://dummyjson.com/users';

const getAllUsers = async (limit = 0, skip = 0): Promise<ApiResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}?limit=${limit}&skip=${skip}`);

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

const searchUser = async (str: string, limit = 0, skip = 0): Promise<ApiResponse | null> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/search?q=${encodeURIComponent(str)}&limit=${limit}&skip=${skip}`
        );

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching users:', error);
        return null;
    }
}

export {
    getAllUsers,
    searchUser
}