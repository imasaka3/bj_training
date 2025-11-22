import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuestions, calculatePayout } from '../utils/gameLogic';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const Practice = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null

    const inputRef = useRef(null);

    useEffect(() => {
        const newQuestions = generateQuestions();
        setQuestions(newQuestions);
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex, feedback]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        const currentBet = questions[currentIndex];
        const correctPayout = calculatePayout(currentBet);
        const isCorrect = parseFloat(userAnswer) === correctPayout;

        const result = {
            question: currentBet,
            userAnswer: parseFloat(userAnswer),
            correctAnswer: correctPayout,
            isCorrect,
            timeTaken,
        };

        setAnswers([...answers, result]);
        setFeedback(isCorrect ? 'correct' : 'incorrect');

        // Short delay to show feedback before moving to next question
        setTimeout(() => {
            setFeedback(null);
            setUserAnswer('');

            if (currentIndex < 9) {
                setCurrentIndex(prev => prev + 1);
                setStartTime(Date.now());
            } else {
                // Game Over
                // We need to pass the results to the Result page. 
                // We can use state in navigation or save to local storage temporarily if needed.
                // For now, let's pass via state.
                navigate('/result', { state: { results: [...answers, result] } });
            }
        }, 800);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentBet = questions[currentIndex];
    const progress = ((currentIndex) / 10) * 100;

    return (
        <div className="max-w-md mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
                <div
                    className="bg-emerald-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 relative overflow-hidden">
                {/* Feedback Overlay */}
                {feedback && (
                    <div className={`absolute inset-0 flex items-center justify-center z-10 ${feedback === 'correct' ? 'bg-emerald-500/90' : 'bg-red-500/90'
                        } backdrop-blur-sm transition-all duration-300`}>
                        {feedback === 'correct' ? (
                            <CheckCircle className="w-24 h-24 text-white animate-bounce" />
                        ) : (
                            <XCircle className="w-24 h-24 text-white animate-pulse" />
                        )}
                    </div>
                )}

                <div className="text-center mb-8">
                    <h2 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">
                        Question {currentIndex + 1} / 10
                    </h2>
                    <div className="text-5xl font-bold text-white mb-2">
                        {currentBet}
                    </div>
                    <p className="text-slate-400 text-sm">Calculate 1.5x payout</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            ref={inputRef}
                            type="number"
                            step="0.1"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-full bg-slate-900 border-2 border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-4 text-3xl text-center font-bold text-white outline-none transition-colors placeholder:text-slate-700"
                            placeholder="?"
                            disabled={!!feedback}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!userAnswer || !!feedback}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                        <span>Submit Answer</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Practice;
