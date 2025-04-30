import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaLink,
  FaSun,
  FaMoon,
  FaTwitter,
  FaBuilding,
} from 'react-icons/fa';

const Github = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

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
        throw new Error('No results');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError('No results');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-4">
          <h1 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>devfinder</h1>
          <button onClick={toggleTheme} className="flex items-center space-x-2">
            <span className={`text-sm font-semibold uppercase ${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </span>
            {theme === 'light' ? <FaMoon className="w-5 h-5 text-gray-600" /> : <FaSun className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Search */}
        <div className={`flex items-center space-x-3 p-4 sm:p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-[#141D2F]'} shadow-md`}>
          <FaSearch className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
          <input
            type="text"
            placeholder="Search GitHub username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 outline-none ${theme === 'light' ? 'bg-gray-50 text-gray-800 placeholder-gray-400' : 'bg-[#141D2F] text-white placeholder-gray-400'}`}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-8">
            <h1 className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading...</h1>
          </div>
        ) : userData ? (
          <div className={`flex flex-col sm:flex-row gap-6 p-6 rounded-lg mt-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#141D2F]'}`}>
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img src={userData.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Header */}
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

              {/* Bio */}
              <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {userData.bio || 'This profile has no bio'}
              </p>

              {/* Stats */}
              <div className={`mt-4 p-4 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1E2A47]'}`}>
                <div className="flex justify-between text-center">
                  {['public_repos', 'followers', 'following'].map((key, idx) => (
                    <div key={idx}>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {key === 'public_repos' ? 'Repos' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                        {userData[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {userData.location || 'Not Available'}
                </p>
                <p className="flex items-center gap-2">
                  <FaLink />
                  {userData.blog ? (
                    <a
                      href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                      className="text-blue-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {userData.blog}
                    </a>
                  ) : (
                    'Not Available'
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <FaTwitter />
                  {userData.twitter_username ? (
                    <a
                      href={`https://twitter.com/${userData.twitter_username}`}
                      className="text-blue-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{userData.twitter_username}
                    </a>
                  ) : (
                    'Not Available'
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <FaBuilding />
                  {userData.company || 'Not Available'}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Github;
