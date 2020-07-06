import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import PageNotFound from "./components/common/PageNotFound";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";

function App() {
  let [globalcountries, setGlobalCountries] = useState([]);
  useEffect(() => {
    const onload = () => {
      fetch("https://restcountries.eu/rest/v2/all")
        .then(response => {
          return response.json();
        })
        .then(result => {
          setGlobalCountries(result);
        })
        .catch(err => {
          console.log(err);
        });
    };
    onload();
    return () => {};
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/country/:id"
          render={props => (
            <Detail {...props} globalcountries={globalcountries} />
          )}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
