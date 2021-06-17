import React, { useState } from "react";
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Switch,
} from "react-router-dom";
import Layout from "./Layouts/Layout";
import BoardPage from "./pages/BoardPage/BoardPage";
import DetailBoardPage from "./pages/DetailBoardPage/DetailBoardPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route
              path={["/", "/scheduler"]}
              exact
              render={(props) => (
                <CalendarPage today={new Date()} history={props.history} />
              )}
            />
            <Route exact="exact" path="/board" component={BoardPage} />
            <Route
              exact="exact"
              path="/detailboard"
              component={DetailBoardPage}
            />
            <Route exact="exact" path="/analysis" component={AnalysisPage} />
            <Route
              render={({ location }) => (
                <div>
                  <h2>존재하지 않는 페이지 입니다.</h2>
                  <p>{location.pathname}</p>
                </div>
              )}
            />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};
export default App;
