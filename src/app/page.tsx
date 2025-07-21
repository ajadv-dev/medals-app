import styles from "./page.module.css";
import {Leaderboard} from "@/features/medals/components/Leaderboard";
import {Suspense} from "react";


export default async function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Olympics Games Leaderboards</h1>
          <Suspense fallback={<p>Loading leaderboard...</p>}>
              <Leaderboard />
          </Suspense>
      </main>
    </div>
  );
}
