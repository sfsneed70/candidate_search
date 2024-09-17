import { Candidate } from "../interfaces/Candidate.interface";
import { readCandidates, writeCandidates } from "../utils/LocalStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(readCandidates());

  const styles = {
    minusStyles: {
      color: "red",
    },
    plusStyles: {
      color: "green",
    },
  };

  const removeCandidate = (candidateId: number) => {
    // const candidates = readCandidates();
    const newCandidates = candidates.filter(
      (c: Candidate) => c.id !== candidateId
    );
    writeCandidates(newCandidates);
    setCandidates(newCandidates);
  };

  const CurrentCandidate = ({ candidate }: { candidate: Candidate }) => {
  
    return (
      <tr className="table-dark">
        <td>
          <img className="rounded-5" style={imgStyles} src={candidate.avatar_url} alt={candidate.login} />{" "}
        </td>
        <td>
          {candidate.name} ({candidate.login})
        </td>
        <td>{candidate.location}</td>
        <td>{candidate.email}</td>
        <td>{candidate.company}</td>
        <td>{candidate.bio}</td>
        <td className="text-center align-middle">
          <button
            className="bg-transparent rounded-circle"
            onClick={() => removeCandidate(candidate.id)}
          >
            {/* <img src={remove} alt="remove candidate" /> */}
            <FontAwesomeIcon style={styles.minusStyles} icon={faCircleMinus} size="4x"/>
          </button>
        </td>
      </tr>
    );
  };

  // useEffect(() => {
  //   setCandidates(readCandidates());
  // }, []);

  const imgStyles = {
    width: 0,
    minWidth: "100%",
  };

  if (candidates.length === 0) {
    return <h1>No candidates to review.</h1>;
  } else {
    return (
      <>
        <h1>Potential Candidates</h1>
        <table className="table table-striped table-dark">
          <thead>
            <tr className="p">
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col">Bio</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate: Candidate) => (
              <CurrentCandidate key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default SavedCandidates;
