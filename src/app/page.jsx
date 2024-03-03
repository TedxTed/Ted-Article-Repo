import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CardListByCategory from "@/components/cardListByCategory/CardListByCategory";
import IntroCard from "@/components/introCard/IntroCard";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <div className={styles.content}>
        <CardListByCategory page={page} />
        <div className={styles.introCard}>
          <IntroCard />
        </div>
      </div>
    </div>
  );
}
