import axios from 'axios';

// "proxy": "http://localhost:5000",
const API_URL = 'https://goalsetter-04n2.onrender.com/api/users';

// register user 
const register = async( userData)=>{
    const response =await axios.post(`${API_URL}/register`, userData);
    if( response.data)
        localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
}

// login user
const login = async( userData)=>{
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    login,
    logout
}
export default authService;