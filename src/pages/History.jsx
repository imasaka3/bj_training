import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, clearHistory } from '../utils/storage';
import { ArrowLeft, Trash2, Calendar, Clock, CheckCircle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            clearHistory();
            setHistory([]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
                {history.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
                    <p className="text-slate-400">No practice history yet.</p>
                    <Link to="/practice" className="text-emerald-400 hover:text-emerald-300 font-bold mt-2 inline-block">
                        Start your first session
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((session) => (
                        <div key={session.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(session.date).toLocaleString()}
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${session.correctCount === session.totalQuestions
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-slate-700 text-slate-300'
                                    }`}>
                                    {Math.round((session.correctCount / session.totalQuestions) * 100)}% Score
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <div className="text-xs text-slate-500 uppercase mb-1">Correct</div>
                                    <div className="text-xl font-bold text-white flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                        {session.correctCount} <span className="text-slate-500 text-sm">/ {session.totalQuestions}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <div className="text-xs text-slate-500 uppercase mb-1">Time</div>
                                    <div className="text-xl font-bold text-white flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        {(session.totalTime / 1000).toFixed(1)}s
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
