import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data02 = [
  { x: 4.5, y: 20 },
  { x: 5.5, y: 20 },
];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const t1 = new Date()
t1.setHours(4 + 4) // need to add hours to get from GMT to ET
t1.setMinutes(20)
const t2 = new Date()
t2.setHours(5 + 4)
t2.setMinutes(0)
const t3 = new Date()
t3.setHours(5 + 4)
t3.setMinutes(20)
const t4 = new Date()
t4.setHours(6 + 4)
t4.setMinutes(0)


const runs : {proper_name: string, start_time: Date, end_time: Date }[] = [
  {proper_name: "30", start_time: t1, end_time: t2},
  {proper_name: "30", start_time: t3, end_time: t4}
]


export const loader = async () => {
  /*
  const res = await fetch("http://localhost:8000/runs");
  return json(await res.json());
  */
 return json(runs)
};

/*
<div className="">
<div>Timetable input</div>

{runs.map(run => (          
  <div id="{run.route + run.start}">Route {run.proper_name} - Start: {new Date(run.start_time).toTimeString().slice(0,5)}. End: {new Date(run.end_time).toTimeString().slice(0,5)}.</div>
))
}
</div>
*/

export default function Index() {
  const runs = useLoaderData<typeof loader>();

  let runId = runs.length
  return (
    <>
<div className="">
<div>Timetable input</div>

{runs.map(run => (          
  <div id="{run.route + run.start}">Route {run.proper_name} - Start: {new Date(run.start_time).toTimeString().slice(0,5)}. End: {new Date(run.end_time).toTimeString().slice(0,5)}.</div>
))
}
</div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
        >
        {runs.map(run => {
          let start = new Date(run.start_time)
          let end = new Date(run.end_time)
          let data = [{ x: start.getHours(), y: runId }, { x: end.getHours(), y: runId },];
          runId--;
          return (<Scatter data={data} fill="#8884d8" line  />)
        })}
          <XAxis type="number" dataKey="x" name="time" unit="" />
          <YAxis type="number" dataKey="y" name="run" unit="" />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}