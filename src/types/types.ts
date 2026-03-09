interface Hair {
    color: string;
    type: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

// Основной тип пользователя
interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: 'admin' | 'user' | 'moderator'; // или можно сделать string, если ролей много
}

type UserPreview = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'image' | 'role' | 'age' | 'phone' | 'ip'>;

type UserSuggestion = Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;

export type { User, Hair, Address, Coordinates, Bank, Company, Crypto, UserPreview, UserSuggestion };
