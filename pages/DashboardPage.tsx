
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Header from '../components/Header';
import DashboardIcon from '../components/icons/DashboardIcon';

const generateData = (length: number) => {
    return Array.from({ length }, (_, i) => ({
      name: `Node ${i + 1}`,
      energy: Math.floor(Math.random() * 5000) + 1000,
      flow: Math.floor(Math.random() * 3000) + 500,
    }));
};

const generateSyncData = (length: number) => {
     return Array.from({ length }, (_, i) => ({
      time: i,
      latency: Math.floor(Math.random() * 100) + 10,
    }));
}

const DashboardPage: React.FC = () => {
    const [energyData, setEnergyData] = useState(generateData(7));
    const [syncData, setSyncData] = useState(generateSyncData(10));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setEnergyData(generateData(7));
            setSyncData(prevData => [...prevData.slice(1), {time: prevData[prevData.length-1].time+1, latency: Math.floor(Math.random() * 100) + 10}]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="animate-fade-in">
      <Header 
        title="Terminus Matrix"
        subtitle="Live monitoring of the core system architecture."
        icon={<DashboardIcon className="w-8 h-8"/>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-matrix-bg/50 p-6 rounded-lg border border-matrix-dark/30">
            <h2 className="text-xl font-semibold text-matrix-cyan mb-4">Energy Nodes & Flow Balance</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 65, 0.1)" />
                    <XAxis dataKey="name" stroke="#a3b3c3" />
                    <YAxis stroke="#a3b3c3" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D0208', border: '1px solid #00FF41' }} />
                    <Legend />
                    <Bar dataKey="energy" fill="#00FF41" />
                    <Bar dataKey="flow" fill="#00FFFF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-matrix-bg/50 p-6 rounded-lg border border-matrix-dark/30">
            <h2 className="text-xl font-semibold text-matrix-cyan mb-4">Sync Matrix Latency (ms)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={syncData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
                    <XAxis dataKey="time" stroke="#a3b3c3" label={{ value: 'Time', position: 'insideBottom', offset: -5, fill: '#a3b3c3' }}/>
                    <YAxis stroke="#a3b3c3"/>
                    <Tooltip contentStyle={{ backgroundColor: '#0D0208', border: '1px solid #00FFFF' }} />
                    <Legend />
                    <Line type="monotone" dataKey="latency" stroke="#00FFFF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
