import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ openLibrary, setOpenLibrary }) => {
  return (
    <nav>
      <h1> Waves</h1>
      <button onClick={() => setOpenLibrary(!openLibrary)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
