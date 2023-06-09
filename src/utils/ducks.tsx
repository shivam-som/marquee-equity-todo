import CryptoJS from 'crypto-js';
import { Todo } from '../components/Dashboard';
const secretKey = 'mySecretKey123';

export const encrypt = (text: string) => {
    const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encryptedText;
}
export const decrypt = (text: string) => {
    const bytes = CryptoJS.AES.decrypt(text, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}
export const updateList = (list: Todo[]) => {
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(list));
}

