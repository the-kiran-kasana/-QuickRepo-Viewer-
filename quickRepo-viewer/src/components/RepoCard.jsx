import React from "react";

function RepoCard({ name, description, stars, forks }) {
  return (
    <div className="border p-4 rounded shadow-md m-2 flex-col items-center justify-center ">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{description || "No description"}</p>
      <div className="flex gap-4 mt-2">
        <p> {stars}</p>
        <p> {forks}</p>
      </div>
    </div>
  );
}

// ✅ React.memo used to avoid re-render if props don’t change
export default React.memo(RepoCard);