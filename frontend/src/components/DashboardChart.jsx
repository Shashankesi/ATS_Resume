import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const DashboardChart = ({ data = [] }) => {
    // Ensure data is suitable for the chart
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="h-64 w-full flex items-center justify-center bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-2xl border border-slate-700/50">
                <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
                    <p className="text-slate-400">No data available yet</p>
                </div>
            </div>
        );
    }

    // Create simple bar chart visualization
    const chartData = data
        .map(d => ({ 
            name: d.name && typeof d.name === 'string' 
                ? (d.name.length > 15 ? d.name.substring(0, 12) + '...' : d.name)
                : 'Resume',
            score: typeof d.score === 'number' ? d.score : 0
        }))
        .slice(0, 5);

    const maxScore = Math.max(...chartData.map(d => d.score), 100);

    return (
        <div className="h-64 w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="h-full flex items-end justify-around gap-2">
                {chartData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col items-center flex-1"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="text-xs text-slate-300 font-semibold mb-2 text-center truncate w-full">
                            {item.score}
                        </div>
                        <motion.div
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.score / maxScore) * 100}%` }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ backgroundColor: 'rgb(249, 115, 22)' }}
                        />
                        <div className="text-xs text-slate-400 mt-2 text-center truncate w-full">
                            {item.name}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DashboardChart;