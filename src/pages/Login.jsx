import { useState } from 'react';
import axios from 'axios';

const dummyUsers = [
  {
    username: 'emilys',
    password: 'emilyspass',
    label: 'Emily Johnson',
  },
  {
    username: 'michaelw',
    password: 'michaelwpass',
    label: 'Michael Williams',
  },
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleUserSelect = (e) => {
    const selectedUser = dummyUsers.find((u) => u.username === e.target.value);
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword(selectedUser.password);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to FlexiHub
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Select a Dummy User
          </label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleUserSelect}
            defaultValue=""
          >
            <option value="" disabled>
              Choose a user
            </option>
            {dummyUsers.map((user) => (
              <option key={user.username} value={user.username}>
                {user.label}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center text-sm text-gray-700">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 accent-blue-500"
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
