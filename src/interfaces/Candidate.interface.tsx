// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  email: string;
  html_url: string;
  company: string;
  bio: string;
}
