export const submitScore = (name, score) => {
    const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    scores.push({ name, score });
    localStorage.setItem('leaderboard', JSON.stringify(scores));
  };
  
  export const getLeaderboard = () => {
    const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return scores.sort((a, b) => b.score - a.score).slice(0, 10);
  };
  