import styles from "./page.module.css";
import projectData from "@/data/mockData.json";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>{projectData.title}</h1>
          <p>{projectData.description}</p>
        </div>
        <ul className={styles.items}>
          {projectData.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
