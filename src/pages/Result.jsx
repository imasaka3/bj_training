import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { saveResult } from '../utils/storage';
import { CheckCircle, XCircle, Home, RotateCcw, Clock } from 'lucide-react';

const Result = () => {
    const location = useLocation();
    const [saved, setSaved] = useState(false);

    const results = location.state?.results;

    useEffect(() => {
        if (results && !saved) {
            const totalTime = results.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const correctCount = results.filter(r => r.isCorrect).length;

            saveResult({
                results,
                totalTime,
                correctCount,
                totalQuestions: results.length
            });
            setSaved(true);
        }
    }, [results, saved]);

    if (!results) {
        return <Navigate to="/" replace />;
    }

    const totalTime = results.reduce((acc, curr) => acc + curr.timeTaken, 0);
    const correctCount = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctCount / results.length) * 100);

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 text-center">
                <h2 className="text-slate-400 uppercase tracking-wider font-semibold mb-4">Session Complete</h2>

                <div className="flex justify-center items-center gap-8 mb-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">{score}%</div>
                        <div className="text-xs text-slate-400 uppercase">Accuracy</div>
                    </div>
                    <div className="w-px h-12 bg-slate-700"></div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">{(totalTime / 1000).toFixed(1)}s</div>
                        <div className="text-xs text-slate-400 uppercase">Total Time</div>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Link
                        to="/practice"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Retry
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Home
                    </Link>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-900/50 border-b border-slate-700 font-semibold text-slate-300">
                    Detailed Results
                </div>
                <div className="divide-y divide-slate-700">
                    {results.map((r, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 font-mono w-6">#{idx + 1}</span>
                                <div>
                                    <div className="text-white font-bold text-lg">
                                        {r.question} <span className="text-slate-500 mx-1">→</span> {r.correctAnswer}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Your answer: <span className={r.isCorrect ? 'text-emerald-400' : 'text-red-400'}>{r.userAnswer}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                {r.isCorrect ? (
                                    <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold">
                                        <CheckCircle className="w-4 h-4" /> Correct
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-red-400 text-sm font-bold">
                                        <XCircle className="w-4 h-4" /> Incorrect
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-slate-500 text-xs">
                                    <Clock className="w-3 h-3" /> {(r.timeTaken / 1000).toFixed(1)}s
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Result;
