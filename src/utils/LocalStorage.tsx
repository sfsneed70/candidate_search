import { Candidate } from "../interfaces/Candidate.interface";

const readCandidates = () => {
  const candidates = localStorage.getItem("candidates");
  return candidates ? JSON.parse(candidates) : [];
};

const updateCandidates = (candidate: Candidate) => {
  const candidates = readCandidates();
  candidates.push(candidate);
  localStorage.setItem("candidates", JSON.stringify(candidates));
};

const writeCandidates = (candidates: Candidate[]) => {
  localStorage.setItem("candidates", JSON.stringify(candidates));
};

export { readCandidates, updateCandidates, writeCandidates };
