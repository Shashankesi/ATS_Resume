import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardChart = ({ data }) => {
    // Ensure data is suitable for the chart
    const chartData = data
        .map(d => ({ 
            name: d.name.length > 15 ? d.name.substring(0, 12) + '...' : d.name, 
            score: d.score 
        }))
        .slice(0, 5); // Show last 5 updates for simplicity

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="name" stroke="#cbd5e1" interval={0} angle={-30} textAnchor="end" height={40} />
                    <YAxis domain={[50, 100]} stroke="#cbd5e1" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} 
                        labelStyle={{ color: '#3b82f6' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;