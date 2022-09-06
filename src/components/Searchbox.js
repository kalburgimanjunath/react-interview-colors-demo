import React from 'react';
export default function Searchbox(props) {
  return (
    <div className="searchbox">
      <div>
        <h3>Search any word(demo : almon)</h3>
        <input
          type="text"
          placeholder="enter the word"
          onChange={props.handleChange}
          value={props.searchColor}
        />
      </div>
    </div>
  );
}
