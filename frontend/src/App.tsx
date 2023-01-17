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
  const [versionBack, setVersionBack] = useState("Unknown");
  const [replica, setReplica] = useState("Unknown");
  useEffect(() => {
    async function getGroups() {
      await axios.get<TReview>('https://bba0sbdabs1tka5v68ph.containers.yandexcloud.net/api/reviews').then((resp: AxiosResponse) => {
        setData(resp.data)
      })
    }

    getGroups().then();
  }, [crutch])

  useEffect(()=> {
    async function getVersion() {
      await axios.get('https://bba0sbdabs1tka5v68ph.containers.yandexcloud.net/api/info/version').then((resp: AxiosResponse) => {
        setVersionBack(resp.data)
      })
      await axios.get<string>('https://bba0sbdabs1tka5v68ph.containers.yandexcloud.net/api/info/host').then((resp: AxiosResponse) => {
        setReplica(resp.data)
      })
    }

    getVersion().then();
  }, [])

  const appVersion = {
    version: packageInfo.version,
    replicaVersion: replica,
    backendVersion: versionBack
  };
  useEffect(() => {
    setData(data);
  }, [data]);
    return (
    <>
      <NavBar setCrutch={setCrutch} crutch={crutch} />
      <InfoPanel reviewList={data} />
      <ReviewTable reviewList={data} />
      <div>Версия фронта: {appVersion.version}<br/> Версия бэка: {appVersion.backendVersion}<br/> Реплика: {appVersion.replicaVersion}
      </div>
    </>
  );
}

export default App;
