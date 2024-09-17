import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import add from "../assets/add.png";
import remove from "../assets/remove.png";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  const textStyles = {
    width: 0,
    minWidth: "100%",
  };

  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    setIndex(0);
    console.log("data:", data);
  };

  useEffect(() => {
    // fetch candidates on page load

    fetchCandidates();
  }, []);

  const nextCandidate = () => {
    if (index === candidates.length - 1) {
      fetchCandidates();
    } else {
      setIndex(index + 1);
    }
    console.log("index:", index);
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      const gitHubUserLogin = candidates[index]?.login;
      if (!gitHubUserLogin) {
        return;
      }
      const data = await searchGithubUser(candidates[index].login);
      // const data = await searchGithubUser('Fenugreek');
      // const data = await searchGithubUser('faokryn');
      // no data returned so skip to next candidate
      if (!data.id) {
        nextCandidate();
      }
    };

    fetchCandidate();
  }, [candidates, index]);

  if (candidates.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="d-flex flex-column flex-wrap">
        <div className="bg-dark rounded-5">
          <img
            className="rounded-top-5"
            src={candidates[index].avatar_url}
            alt="user avatar"
          />
          <h2 className="px-2 py-3" style={textStyles}>
            {candidates[index].name} ({candidates[index].login})
          </h2>
          <h4 className="px-2 py-2" style={textStyles}>
            Location: {candidates[index].location}
          </h4>
          <h4 className="px-2 py-2" style={textStyles}>
            Email: {candidates[index].email}
          </h4>
          <h4 className="px-2 py-2" style={textStyles}>
            Company: {candidates[index].company}
          </h4>
          <h4 className="px-2 py-2" style={textStyles}>
            Bio: {candidates[index].bio}
          </h4>
        </div>
        <div className="d-flex justify-content-between">
          <button className="bg-transparent px-5" onClick={nextCandidate}>
            <img src={remove} alt="remove user" />
          </button>
          <button className="bg-transparent px-5" onClick={nextCandidate}>
            <img src={add} alt="add user" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CandidateSearch;
