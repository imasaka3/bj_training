export const INITIAL_CHIPS = 1000;

export const generateQuestions = (count = 10) => {
    const questions = [];
    for (let i = 0; i < count; i++) {
        // Generate random number between 50 and 500
        const bet = Math.floor(Math.random() * 451) + 50;
        questions.push(bet);
    }
    return questions;
};

export const calculatePayout = (bet) => {
    return bet * 1.5;
};

/**
 * Determine if CPU should bet based on chip comparison
 * Strategy: CPU bets when it has fewer chips than the opponent
 * @param {number} cpuChips - Current CPU chip count
 * @param {number} playerChips - Current player chip count
 * @returns {boolean} - True if CPU should bet
 */
export const shouldCpuBet = (cpuChips, playerChips) => {
    return cpuChips < playerChips;
};
