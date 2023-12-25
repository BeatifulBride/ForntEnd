export const calculateDaysLeft = (dateString) => {
    const weddingDate = new Date(dateString);
    const today = new Date();
    const timeLeft = weddingDate.getTime() - today.getTime();
    return Math.ceil(timeLeft / (1000 * 3600 * 24));
};