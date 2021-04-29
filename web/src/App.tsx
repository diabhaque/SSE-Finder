import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Home } from "./home/Home";

// Move components to separate page.

const CaseRecordsPage = () => {
    return <div>Case Records</div>;
};

const FindSsePage = () => {
    return <div>Find SSEs</div>;
};
const AddCasePage = () => {
    return <div>Add Case</div>;
};

const SideBarLayout = () => {
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
                        <SideBarLayout />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
