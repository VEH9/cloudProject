import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import packageInfo from "../package.json";
import "./App.css";
import { NavBar } from "./components/nav-bar/NavBar";
import { ReviewTable } from "./components/review-table/ReviewTable";
import { mockRewiesList } from "./mock/mockRewies";
import { InfoPanel } from "./components/infoPanel/InfoPanel";

function App() {
  let [data, setData] = useState(mockRewiesList);
    useEffect(() => {
        async function getGroups() {
            const resp = await fetch('/api/info');
            const respJson = await resp.json();
            console.log(respJson);
            //setGroups(respJson.groupIds);
        }

        getGroups();
    }, [])
  const appVersion = {
    version: packageInfo.version,
    replicaVersion: "Unknown",
    backendVersion: "Unknown",
  };
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <>
      <NavBar setData={setData} data={data} />
      <InfoPanel reviewList={data} />
      <ReviewTable reviewList={data} />
      <div>{packageInfo.version}</div>
    </>
  );
}

export default App;
