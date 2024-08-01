import Pomodoro from "../../components/Pomodoro";
import { getDailyStreak } from "../actions/pomodoro";

const PomodoroPage = async () => {
  const dailyStreak = await getDailyStreak();

  return <Pomodoro dailyStreak={dailyStreak} />;
};

export default PomodoroPage;
