import "./App.css";
import Widgets from "./components/Widgets";
import { HOME, POST_COLLECTION } from "./common/Api";

function App() {
  return (
    <div className="App">
      <h1 className="page-title">
        ABC College of engineering
        <a
          className="float-right btn btn-primary btn-lg"
          href={HOME + POST_COLLECTION}
          target="_blank"
          download
          rel="noreferrer"
        >
          Download Postman Collection
        </a>
      </h1>
      <Widgets />
    </div>
  );
}

export default App;
