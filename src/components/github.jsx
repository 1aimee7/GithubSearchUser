import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaSearch, FaMapMarkerAlt, FaLink, FaSun, FaMoon } from 'react-icons/fa';

const Github = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No results');
      }
      const data = await response.json();
      console.log('API Response:', data);
      setUserData(data);
    } catch (err) {
      console.error('Error fetching user:', err.message);
      setError('No results');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 sm:p-2 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className={`w-full max-w-md rounded-lg shadow-lg p-6 sm:p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-6 sm:mb-4">
          <h1 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>devfinder</h1>
          <button onClick={toggleTheme} className="flex items-center space-x-2">
            <span className={`text-sm font-semibold uppercase ${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </span>
            {theme === 'light' ? (
              <FaMoon className="w-5 h-5 text-gray-600" />
            ) : (
              <FaSun className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className={`flex items-center space-x-3 p-4 sm:p-3 rounded-lg mb-6 sm:mb-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} shadow-md`}>
          <FaSearch className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
          <input
            type="text"
            placeholder="Search GitHub username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 outline-none ${theme === 'light' ? 'bg-gray-50 text-gray-800 placeholder-gray-400' : 'bg-gray-800 text-white placeholder-gray-400'}`}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <span>Search</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h1 className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading...</h1>
            </div>
          ) : userData ? (
            <div className="space-y-4 sm:space-y-3">
              <div className="flex space-x-4 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                <img src={userData.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full" />
                <div className="flex-1 sm:text-center">
                  <div className="flex justify-between items-start sm:flex-col sm:space-y-1">
                    <div>
                      <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.name || userData.login}</h2>
                      <p className="text-blue-400">@{userData.login}</p>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Joined {new Date(userData.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} sm:text-center`}>{userData.bio || 'This profile has no bio'}</p>
              <div className={`flex justify-between p-4 sm:p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                <div className="text-center">
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Repos</p>
                  <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.public_repos}</p>
                </div>
                <div className="text-center">
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Followers</p>
                  <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.followers}</p>
                </div>
                <div className="text-center">
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Following</p>
                  <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.following}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-2">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className={`w-5 h-5 ${userData.location ? (theme === 'light' ? 'text-gray-600' : 'text-white') : (theme === 'light' ? 'text-gray-400' : 'text-gray-400')}`} />
                  <p className={`text-sm ${userData.location ? (theme === 'light' ? 'text-gray-600' : 'text-white') : (theme === 'light' ? 'text-gray-400' : 'text-gray-400')}`}>
                    {userData.location || 'Not Available'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLink className={`w-5 h-5 ${userData.html_url ? (theme === 'light' ? 'text-gray-600' : 'text-white') : (theme === 'light' ? 'text-gray-400' : 'text-gray-400')}`} />
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm truncate ${userData.html_url ? (theme === 'light' ? 'text-gray-600' : 'text-white') : (theme === 'light' ? 'text-gray-400' : 'text-gray-400')}`}
                  >
                    {userData.html_url || 'Not Available'}
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Github;