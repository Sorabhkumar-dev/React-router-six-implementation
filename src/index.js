import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseId" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element = {<DashBoard/>}/>
      <Route path="myApp" element={<Navigate replace to="/learn" />} />
    </Routes>
  </Router>
);

function Home() {
  return <h1>Home Screen</h1>;
}

function Learn() {
  return (
    <div>
      <h1>Learn Screen</h1>
      <h4>Your Courses listed below</h4>
      <div className="container my-3">
        <Link to="/learn/courses" className="btn btn-primary">
          Course
        </Link>
        <Link to="/learn/bundles" className="btn btn-primary mx-4">
          Bundle
        </Link>
        <Outlet className="my-3" />
      </div>
    </div>
  );
}

function Courses() {
  const courseList = ["Kotlin", "Java", "Python", "Javascript", "objcet-c"];
  const courseName = courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div className="container">
      <h1>Courses list</h1>
      <h4>Courses card</h4>
      <NavLink
        to={`/learn/courses/${courseName}`}
        className={"btn btn-secondary"}
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "red" : "blue",
            color: "white",
          };
        }}
      >
        {courseName}
      </NavLink>
      <NavLink
        to={`/learn/courses/test`}
        className={"btn btn-warning mx-3"}
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "red" : "blue",
            color: "white",
          };
        }}
      >
        test
      </NavLink>
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div className="container">
      <h1>Bundle list</h1>
      <h4>Bundle card</h4>
    </div>
  );
}

function CourseId() {
  const navigate = useNavigate()
  const { courseId } = useParams();
  return (
    <div className="container">
      <h1>URL params is {courseId}</h1>
      <button onClick={() => {
        navigate("/dashboard",{state: courseId})
      }} className="btn btn-info text-white">
        Get Price
      </button>
    </div>
  );
}

function DashBoard() {
  const location = useLocation()
  return (
    <div className="container">
      <h1>price of course is {location.state  } </h1>
    </div>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
