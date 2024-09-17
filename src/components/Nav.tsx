import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark py-2 p-2">
      <ul className="navbar-nav fs-2">
        <li className="nav-item">
          <Link
            to="/"
            className={currentPage === "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SavedCandidates"
            className={
              currentPage === "/SavedCandidates"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Potential Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
