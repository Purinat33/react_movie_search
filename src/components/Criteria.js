import React from 'react';

function Criteria(props) {
  const { searchCriteria, setSearchCriteria } = props;

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  return (
    <div>
        <label>
        <input
          type="radio"
          value="title"
          checked={searchCriteria === "title"}
          onChange={handleCriteriaChange}
        />
        Title
      </label>
      <label>
        <input
          type="radio"
          value="director"
          checked={searchCriteria === "director"}
          onChange={handleCriteriaChange}
        />
        Director
      </label>

      <label>
        <input
          type="radio"
          value="originalTitle"
          checked={searchCriteria === "originalTitle"}
          onChange={handleCriteriaChange}
        />
        Original Title
      </label>
      
      <label>
        <input
          type="radio"
          value="year"
          checked={searchCriteria === "year"}
          onChange={handleCriteriaChange}
        />
        Year
      </label>
    </div>
  );
}

export default Criteria;
