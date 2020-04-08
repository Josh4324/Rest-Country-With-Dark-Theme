import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Home = props => {
  let [globalcountries, setGlobalCountries] = useState([]);
  let [countries, setCountries] = useState([]);
  let [searchResult, setSearchResult] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  const shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const onfilter = evt => {
    let value = evt.target.value.toLowerCase();
    fetch(`https://restcountries.eu/rest/v2/region/${value}`)
      .then(response => {
        return response.json();
      })
      .then(result => {
        let countriesArray = shuffle(result).slice(0, 20);
        setCountries(countriesArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSearch = evt => {
    evt.preventDefault();
    let value = evt.target.value.toLowerCase();
    console.log(value);
    setSearchValue(value);
    const s = globalcountries.filter(country => {
      let name = country.name.toLowerCase();
      return name.startsWith(value);
    });
    setSearchResult(s);
  };

  useEffect(() => {
    const onload = () => {
      fetch("https://restcountries.eu/rest/v2/all")
        .then(response => {
          return response.json();
        })
        .then(result => {
          let countriesArray = shuffle(result).slice(0, 20);
          setCountries(countriesArray);
          setGlobalCountries(result);
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    };
    onload();
    return () => {};
  }, []);

  return (
    <div className="main">
      <div className="inner-main">
        <div className="search">
          <div className="sleft">
            <FontAwesomeIcon className="fas icon" icon={faSearch} />
            <input
              className="isearch"
              type="search"
              name="search"
              id="search"
              placeholder="Search for a country..."
              onChange={onSearch}
            />
            <div className="searchModal">
              {searchResult.length > 0 && searchValue !== "" ? (
                <div>
                  {searchResult.map(country => {
                    return (
                      <div
                        className="melement"
                        key={country.name}
                        onClick={() =>
                          props.history.push(`/country/${country.name}`)
                        }
                      >
                        {country.name}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <div className="sright">
            <select
              className="filter"
              onChange={onfilter}
              name="region"
              id="region"
            >
              <option value="">Filter by Region</option>
              <option value="Africa">Africa </option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>

        <div className="container">
          {countries.map(country => {
            return (
              <div
                key={country.name}
                className="item"
                onClick={evt => props.history.push(`/country/${country.name}`)}
              >
                <div>
                  <img className="img" src={country.flag} alt={country.name} />
                </div>
                <div className="item-body">
                  <h3>{country.name}</h3>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
