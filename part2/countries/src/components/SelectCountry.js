import React from 'react'

const SelectCountry = (props) => {
    return (
        <div>
            <ul>
                {props.filteredCountries.map(country =>
                    <li key={country.name}>
                        {country.name} {" "}
                        <button onClick={() => props.setInput(country.name)} > show</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default SelectCountry