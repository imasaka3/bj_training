import React from 'react';
import { Link } from 'react-router-dom';
import { Play, History } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col gap-4">
            <Link
                to="/practice"
                className="group relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-6 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                <Play className="w-6 h-6 fill-current" />
                <span className="text-xl font-bold">Start Practice</span>
                <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
            </Link>

            <Link
                to="/history"
                className="group relative flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-200 p-4 rounded-xl border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                <History className="w-5 h-5" />
                <span className="text-lg font-medium">View History</span>
            </Link>
        </div>
    );
};

export default Home;
