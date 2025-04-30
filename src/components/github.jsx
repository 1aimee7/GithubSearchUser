import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaLink, FaSun, FaMoon } from 'react-icons/fa';

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
      setUserData(data);
    } catch (err) {
      setError('No results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('octocat'); 
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Joined ${date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`;
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 sm:p-2 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#141D2F]'}`}>
      <div className={`w-full max-w-2xl rounded-lg shadow-lg p-6 sm:p-4 ${theme === 'light' ? 'bg-white' : 'bg-[#1E2A47]'} transition-colors duration-300`}>
       
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

        
        <div className={`flex items-center space-x-3 p-4 sm:p-3 rounded-lg mb-6 sm:mb-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#141D2F]'} shadow-md`}>
          <FaSearch className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
          <input
            type="text"
            placeholder="Search GitHub username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 outline-none ${theme === 'light' ? 'bg-gray-50 text-gray-800 placeholder-gray-400' : 'bg-[#141D2F] text-white placeholder-gray-400'}`}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <span>Search</span>
          </button>
        </div>

       
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1 className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading...</h1>
          </div>
        ) : userData ? (
          <div className={`flex flex-col sm:flex-row gap-6 p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-[#141D2F]'}`}>
            
            <div className="flex-shrink-0">
              <img src={userData.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full" />
            </div>

           
            <div className="flex-1">
             
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {userData.name || userData.login}
                  </h2>
                  <p className="text-blue-400">@{userData.login}</p>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formatDate(userData.created_at)}
                </p>
              </div>

             
              <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {userData.bio || 'This profile has no bio'}
              </p>

             
              <div className={`mt-4 p-4 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1E2A47]'}`}>
                <div className="flex justify-between text-center">
                  <div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Repos</p>
                    <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.public_repos}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Followers</p>
                    <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.followers}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Following</p>
                    <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{userData.following}</p>
                  </div>
                </div>
              </div>

              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
                    {userData.location || 'Not available'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLink className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
                  <a
                    href={userData.blog || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} hover:underline`}
                  >
                    {userData.blog || 'Not available'}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-white'}`} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
                    @{userData.login}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Github;
