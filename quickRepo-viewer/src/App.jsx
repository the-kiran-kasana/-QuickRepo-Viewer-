import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./components/ThemeContext";


function App() {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!query) return;

    const fetchGitRepo = async () => {
      setLoading(true);
      setError(""); // reset error before new search
      try {
        const res = await axios.get(
          `https://api.github.com/users/${query}/repos`
        );
        setRepos(res.data);
      } catch (err) {
        setError("User not found or API error");
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitRepo();
  }, [query]);



  return (
    <div className="p-6  flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold items-center justify-center ml-200">GitHub Repository Finder</h1>
        <button  onClick={toggleTheme} className="mt-6 px-4 py-2 border rounded ml-210" > Toggle {theme === "light" ? "Dark" : "Light"} Mode </button>

      <SearchBar onSearch={setQuery} />


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 mt-4">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count}
            forks={repo.forks_count}
          />
        ))}
      </div>

        </div>
  );



}

export default App;
