import { Candidate } from "../interfaces/Candidate.interface";

const readCandidates = () => {
  const candidates = localStorage.getItem("candidates");
  return candidates ? JSON.parse(candidates) : [];
};

const writeCandidates = (candidate: Candidate) => {
const candidates = readCandidates();
    candidates.push(candidate);
  localStorage.setItem("candidates", JSON.stringify(candidates));
};

export { readCandidates, writeCandidates };