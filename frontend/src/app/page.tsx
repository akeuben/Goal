import Link from "next/link";
import styles from "./page.module.css";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default function Home() {
    if(getUserSession() !== null) {
        redirect("/dashboard");
    }
  return (
    <>
        <h1 className={styles.title}>GOAL</h1>
        <h2 className={styles.tagline}>The all in one Game Completion Tracker.</h2>
        <p>
            Take control of your gaming journey with our all-in-one tracking platform! Whether you're a casual player or a completionist, our site helps you organize your progress, set goals, and celebrate your achievements. From tracking your completed games and customizing completion categories to reviewing games and sharing your gaming profile with friends, we make it easy to stay on top of your backlog. Earn points for unlocking achievements, create personalized to-do lists, and explore what others are playing—all designed to make gaming even more rewarding.
        </p>
        <div>
            <Link href="/register"><button className="important">Register Now!</button></Link>
            <Link href="/login"><button>Login</button></Link>
        </div>
        <h3>Track Your Gaming Progress</h3>
        <p>Stay organized and motivated by tracking the games you’ve completed and the ones still in progress.</p>

        <h3>Custom Completion Categories</h3>
        <p>Define your own completion goals—whether it’s finishing the main story, 100% completion, or something in between.</p>

        <h3>Achievement Tracking</h3>
        <p>Keep tabs on in-game achievements and mark them off as you conquer them.</p>

        <h3>Custom To-Do Lists</h3>
        <p>Create personalized checklists for each game to stay focused on your objectives.</p>

        <h3>Share Profiles with Friends</h3>
        <p>Show off your gaming journey by sharing your profile link with friends. Browse their profiles for inspiration!</p>

        <h3>Game Reviews</h3>
        <p>Rate and review the games you’ve played to share your thoughts with the community.</p>

        <h3>Earn Points</h3>
        <p>Gain points for completing achievements and climb the leaderboard. Turn your progress into bragging rights!</p>

        <h3>Join Today and Take Control of Your Backlog!</h3>
        <p>Start tracking your gaming adventure now and make every play session count.</p>
    </>
  );
}
