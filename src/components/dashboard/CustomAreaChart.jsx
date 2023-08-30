import React, { useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomAreaChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 400,
      pv: 200,
      amt: 250,
    },
    {
      name: "Feb",
      uv: 300,
      pv: 398,
      amt: 210,
    },
    {
      name: "Mar",
      uv: 200,
      pv: 380,
      amt: 229,
    },
    {
      name: "Apr",
      uv: 280,
      pv: 398,
      amt: 200,
    },
    {
      name: "May",
      uv: 190,
      pv: 400,
      amt: 211,
    },
    {
      name: "Jun",
      uv: 390,
      pv: 300,
      amt: 250,
    },
    {
      name: "Jul",
      uv: 390,
      pv: 300,
      amt: 200,
    },
    {
      name: "Aug",
      uv: 400,
      pv: 330,
      amt: 210,
    },
    {
      name: "Sep",
      uv: 390,
      pv: 400,
      amt: 210,
    },
    {
      name: "Oct",
      uv: 290,
      pv: 100,
      amt: 260,
    },
    {
      name: "Nov",
      uv: 340,
      pv: 470,
      amt: 210,
    },
    {
      name: "Dec",
      uv: 380,
      pv: 400,
      amt: 300,
    },
  ];
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  //console.log(windowSize.current[0], "size");
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#61C7FA" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#61C7FA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF0066" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FF0066" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" style={{ fontSize: 12, color: "#eb4034" }} />
        <YAxis style={{ fontSize: 12, color: "#eb4034" }} />
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#61C7FA"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#FF0066"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
