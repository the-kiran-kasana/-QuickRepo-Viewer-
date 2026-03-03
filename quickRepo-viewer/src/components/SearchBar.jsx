import React, { useState } from "react"

export default function SearchBar({ onSearch })
{

     const [input, setInput] = useState("");

     const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
       }
     };


      return (
         <>
             <form onSubmit={handleSubmit} className="p-4 ml-190">
               <input type="text"  placeholder="Enter GitHub Username" value={input} onChange={(e) => setInput(e.target.value)}  className="border p-2 rounded mr-2"/>
               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search </button>
             </form>
         </>

      );
}



//       const [userName , setUserName] = useState("")
//       const [gitUser , setGitUser] = useState([])
//       const [errors , setErrors] = useState("")
//       const [loading , setLoading] = useState(false)
//
//       useEffect(() => {
//            try{
//               const response = axios.get(`https://api.github.com/users/${userName}/repos`);
//               setGitUser(response.data);
//               setLoading(true)
//               console.log(gitUser)
//               renderFun(userName,gitUser);
//            }
//            catch(error) {
//              setErrors("user not found")
//              console.log(errors)
//            }
//       },[userName]);
//
//
//       function renderFun(userName,gitUser){
//           return (
//              <RepoCard user={userName , gitUser}/>
//           )
//       }