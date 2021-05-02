import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { CaseRecordsPage } from "./components/CaseRecordsPage";
import { AddCasePage } from "./components/AddCasePage";
import { FindSsePage } from "./components/FindSsePage";
import { CaseData } from "./components/CaseData";

const HomeNavigation = () => {
    return (
        <Home>
            <Switch>
                <Route exact path="/">
                    <CaseRecordsPage />
                </Route>
                <Route exact path="/find-sse">
                    <FindSsePage />
                </Route>
                <Route exact path="/add-case">
                    <AddCasePage />
                </Route>
                <Route exact path="/case-data/:id">
                    <CaseData />
                </Route>
            </Switch>
        </Home>
    );
};

function App() {
    return (
        <div className="App" style={{ height: "100vh" }}>
            <Router>
                <Switch>
                    <Route path="/">
                        <HomeNavigation />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
