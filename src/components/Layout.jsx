import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
            <div className="container mx-auto px-4 py-4 max-h-screen landscape:py-2 landscape:px-6 max-w-4xl landscape:max-w-none">
                <header className="mb-4 landscape:mb-2 text-center landscape:flex landscape:items-center landscape:justify-between">
                    <div className="landscape:flex landscape:items-baseline landscape:gap-3">
                        <h1 className="text-2xl landscape:text-xl font-bold text-emerald-400 tracking-tight">Blackjack Payout</h1>
                        <p className="text-slate-400 text-sm landscape:text-xs">Practice your payout calculations</p>
                    </div>
                </header>
                <main className="landscape:max-h-[calc(100vh-60px)] landscape:overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
