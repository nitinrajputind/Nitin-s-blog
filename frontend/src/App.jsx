import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import FooterComp from "./components/Footer";
import { PrivateRoute, ProtectedRoute } from "./components/PrivateRoute";
import { AdminPrivateRoute } from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          {/* Admin Private Routes */}
          <Route element={<AdminPrivateRoute/>}>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/update-post/:postId" element={<UpdatePost/>}/>
          </Route>

          {/* For making protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          {/* For making protected route */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/projects" element={<Projects />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
}
