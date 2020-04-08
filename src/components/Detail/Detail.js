import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Detail = props => {
  let globalcountries = props.globalcountries;
  let name = props.match.params.id;
  let country = globalcountries.filter(country => {
    return country.name === name;
  });

  return (
    <div className="main">
      <div className="inner-main">
        <div className="backblock">
          <Link className="but" to="/">
            <FontAwesomeIcon className="fas" icon={faArrowLeft} /> Back
          </Link>
        </div>
        {country.length > 0 ? (
          <div className="cdetails">
            <div className="flag">
              <img
                className="dimg"
                src={country[0].flag}
                alt={country[0].name}
              />
            </div>
            <div className="details">
              <h1>{country[0].name}</h1>
              <div className="inner-details">
                <div className="ndetail">
                  <p>Native Name: {country[0].nativeName}</p>
                  <p>Population: {country[0].population}</p>
                  <p>Region: {country[0].region}</p>
                  <p>Sub Region: {country[0].subregion}</p>
                  <p>Capital: {country[0].capital}</p>
                </div>
                <div>
                  <p>
                    Top Level Domain:{" "}
                    {country[0].topLevelDomain.length > 1
                      ? country[0].topLevelDomain.map(domain => {
                          return domain + ", ";
                        })
                      : country[0].topLevelDomain[0]}
                  </p>
                  <p>
                    Currencies:{" "}
                    {country[0].currencies.length > 1
                      ? country[0].currencies.map(currency => {
                          return currency.name + ", ";
                        })
                      : country[0].currencies[0].name}
                  </p>
                  <p>
                    Languages:{" "}
                    {country[0].languages.length > 1
                      ? country[0].languages.map(language => {
                          return language.name + ", ";
                        })
                      : country[0].languages[0].name}
                  </p>
                </div>
              </div>
              <div className="borders">
                <span className="blockborder">Border Countries: </span>
                <div className="borderflex">
                  {country[0].borders.map(country => {
                    return (
                      <span
                        onClick={evt =>
                          props.history.push(
                            `/country/${evt.target.textContent}`
                          )
                        }
                        className="borderbut"
                      >
                        {globalcountries.map(newcountry => {
                          if (newcountry.alpha3Code === country) {
                            return newcountry.name;
                          }
                        })}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Detail;
