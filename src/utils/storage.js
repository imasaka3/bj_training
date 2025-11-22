const STORAGE_KEY = 'blackjack_payout_history';

export const saveResult = (result) => {
    const history = getHistory();
    const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...result
    };
    const newHistory = [newEntry, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newEntry;
};

export const getHistory = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse history', e);
        return [];
    }
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};
