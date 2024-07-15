import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidbar from "../components/DashSidbar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParms = new URLSearchParams(location.search);
    const tabFormUrl = urlParms.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Dashboard SideBar */}
      <div className="md:w-56">
        <DashSidbar />
      </div>
      {/* Profile Section */}
      {tab === "profile" && <DashProfile />}
      {/* Admin Posts Section */}
      {tab === "posts" && <DashPosts />}
      {/* All Users Sections */}
      {tab === "users" && <DashUsers />}
      {/* All comments Section */}
      {tab === "comments" && <DashComments />}
    </div>
  );
}
