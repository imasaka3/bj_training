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
