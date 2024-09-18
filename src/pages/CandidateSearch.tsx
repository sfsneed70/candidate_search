import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import { updateCandidates } from "../utils/LocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [index, setIndex] = useState(0);

  const styles = {
    minusStyles: {
      color: "red",
    },
    plusStyles: {
      color: "green",
    },
    textStyles: {
      width: 0,
      minWidth: "100%",
    },
    imgStyles: {
      width: "450px",
      height: "450px",
      minHeight: "100%",
      minWidth: "100%",
    },
  };

  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    setIndex(0);
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
  };

  const addCandidate = () => {
    updateCandidates(candidate);
    nextCandidate();
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      const gitHubUserLogin = candidates[index]?.login;
      if (!gitHubUserLogin) {
        return;
      }

      // const data = await searchGithubUser('Fenugreek');
      const data = await searchGithubUser(candidates[index].login);

      // no data returned so skip to next candidate
      if (!data.id) {
        nextCandidate();
      } else {
        setCandidate(data);
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
              style={styles.imgStyles}
              className="rounded-top-5"
              src={candidate.avatar_url}
              alt="user avatar"
            />
            <h2 className="px-2 py-3" style={styles.textStyles}>
              {candidate.name} ({candidate.login})
            </h2>
            <h4 className="px-2 py-2" style={styles.textStyles}>
              Location: {candidate.location}
            </h4>
            <h4 className="px-2 py-2" style={styles.textStyles}>
              Email: <a href={'mailto:' + candidate.email}>{candidate.email}</a>
            </h4>
            <h4 className="px-2 py-2" style={styles.textStyles}>
              Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
            </h4>
            <h4 className="px-2 py-2" style={styles.textStyles}>
              Company: {candidate.company}
            </h4>
            <h4 className="px-2 py-2" style={styles.textStyles}>
              Bio: {candidate.bio}
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <button className="bg-transparent" onClick={nextCandidate}>
              <FontAwesomeIcon
                style={styles.minusStyles}
                icon={faCircleMinus}
                size="4x"
              />
            </button>
            <button className="bg-transparent" onClick={addCandidate}>
              <FontAwesomeIcon
                style={styles.plusStyles}
                icon={faCirclePlus}
                size="4x"
              />
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CandidateSearch;
