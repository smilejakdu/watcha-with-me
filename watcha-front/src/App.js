import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layouts/Layout";
import BoardPage from "./pages/BoardPage/BoardPage";
import SchedulerPage from "./pages/SchedulerPage/SchedulerPage";

const App = () => {
  return (
      <div>
          <Router>
              <Layout>
                  <Switch>
                      <Route
                          exact="exact"
                          path={["/", "/scheduler"]}
                          component={SchedulerPage}
                      />
                      <Route
                          exact="exact"
                          path="/board"
                          component={BoardPage}
                      />
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
