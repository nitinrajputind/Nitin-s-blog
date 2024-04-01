import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { SignOutSucess } from "../redux/reducers/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParms = new URLSearchParams(location.search);
    const tabFormUrl = urlParms.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  const handleSignOut = async ()=>{
    try {
      const res = await fetch('/api/user/signout',{
        method: 'POST'
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      } else{
        dispatch(SignOutSucess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label="user"
              labelColor={"dark"}
              as = 'div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
