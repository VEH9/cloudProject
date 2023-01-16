import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import packageInfo from "../package.json";
import "./App.css";
import { NavBar } from "./components/nav-bar/NavBar";
import { ReviewTable } from "./components/review-table/ReviewTable";
import { InfoPanel } from "./components/infoPanel/InfoPanel";
import axios, {AxiosResponse} from 'axios';
import {TReview} from "./types/TReview";

function App() {
  let start: TReview[] = [];
  let [data, setData] = useState<TReview[]>(start);
  let [crutch, setCrutch] = useState(false);
  useEffect(() => {
    async function getGroups() {
      await axios.get<TReview>('https://localhost:5001/api/reviews').then((resp: AxiosResponse) => {
        setData(resp.data)
      })
    }

    getGroups().then(r => console.log("usEffect"))
  }, [crutch])
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
      <NavBar setCrutch={setCrutch} crutch={crutch} />
      <InfoPanel reviewList={data} />
      <ReviewTable reviewList={data} />
      <div>{packageInfo.version}</div>
    </>
  );
}

export default App;
