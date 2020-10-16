import React from 'react'

const Search = ({input , handleInput}) => {
    return (
      <form>
        <div>
        find countries
          <input
            value={input}
            onChange={handleInput}
          />
        </div>
    </form>
)}

export default Search