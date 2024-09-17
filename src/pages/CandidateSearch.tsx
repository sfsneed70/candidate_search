import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import add from "../assets/add.png";
import remove from "../assets/remove.png";
import { writeCandidates } from "../utils/LocalStorage";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
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
    // need to fetch new candidates
    if (index === candidates.length - 1) {
      fetchCandidates();
    } else {
      setIndex(index + 1);
    }
    // console.log("index:", index);
  };

  const addCandidate = () => {
    writeCandidates(candidates[index]);
    nextCandidate();
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      const gitHubUserLogin = candidates[index]?.login;
      if (!gitHubUserLogin) {
        return;
      }
      const data = await searchGithubUser(candidates[index].login);

      // no data returned so skip to next candidate
      if (!data.id) {
        nextCandidate();
      } else {
        setCandidate(data);
        console.log("candidate:", candidates[index]);
      }
    };

    fetchCandidate();
  }, [candidates, index]);

  // candidate list is empty or candidate object is empty
  if (candidates.length === 0 || !candidate.id) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Candidate Search</h1>
        <div className="d-flex flex-column flex-wrap">
          <div className="bg-dark rounded-5">
            <img
              className="rounded-top-5"
              src={candidate.avatar_url}
              alt="user avatar"
            />
            <h2 className="px-2 py-3" style={textStyles}>
              {candidates[index].name} ({candidate.login})
            </h2>
            <h4 className="px-2 py-2" style={textStyles}>
              Location: {candidate.location}
            </h4>
            <h4 className="px-2 py-2" style={textStyles}>
              Email: {candidate.email}
            </h4>
            <h4 className="px-2 py-2" style={textStyles}>
              Company: {candidate.company}
            </h4>
            <h4 className="px-2 py-2" style={textStyles}>
              Bio: {candidate.bio}
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <button className="bg-transparent px-5" onClick={nextCandidate}>
              <img src={remove} alt="remove user" />
            </button>
            <button className="bg-transparent px-5" onClick={addCandidate}>
              <img src={add} alt="add user" />
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CandidateSearch;
