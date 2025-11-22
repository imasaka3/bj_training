import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
            <div className="container mx-auto px-4 py-8 max-w-md">
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-emerald-400 tracking-tight">Blackjack Payout</h1>
                    <p className="text-slate-400 text-sm">Practice your payout calculations</p>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
