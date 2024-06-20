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
const t5 = new Date()
t5.setHours(5 + 4)
t5.setMinutes(0)
const t6 = new Date()
t6.setHours(6 + 4)
t6.setMinutes(0)


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

*/

const schedule = [
  {proper_name: "30", start_time: t1, end_time: t2, vehicle_id: 1},
  {proper_name: "30", start_time: t3, end_time: t4, vehicle_id: 1},
  {proper_name: "30", start_time: t5, end_time: t6, vehicle_id: 2},
]

// group rows by vehicle id
//    order list of v -> list of runs


export default function Index() {
  const runs = useLoaderData<typeof loader>();

  const scheduleByVehicle = new Map<number, {start_time: Date, end_time: Date}[]>();
  schedule.map(s => {
    let entry = []
    let old = scheduleByVehicle.get(s.vehicle_id)
    if( old != undefined) {
      entry = old
    }
    scheduleByVehicle.set(s.vehicle_id, entry.concat([s]))
  })

  let runId = runs.length
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          >
          {Array.from(scheduleByVehicle.entries()).flatMap(pr => {
            return pr[1].map(run => {
              let start = new Date(run.start_time)
              let end = new Date(run.end_time)
              let data = [{ x: start.getHours(), y: pr[0] }, { x: end.getHours(), y: pr[0] },];
              return (<Scatter data={data} fill="#8884d8" line />)
            })
          })}
            <XAxis type="number" dataKey="x" name="time" unit="" />
            <YAxis type="number" dataKey="y" name="run" unit="" />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}