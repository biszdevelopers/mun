import WikiArticle, { type ArticleMetadata } from "../WikiArticle";
import styles from "./theme.module.css";

const committees = [
  {
    name: "GA",
    topics: [
      "Addressing the existential threats posed by sea-level rise to Small Island Developing States and low-lying coastal regions",
      "Establishing Legal Frameworks for Commercial Extraction of Extraterrestrial Resources",
    ],
  },
  {
    name: "HRC",
    topics: [
      "Protecting Victims of Forced Criminality in Southeast Asian Cyber-Scam Compounds",
      "Protecting Indigenous Land Rights in the Extraction of Critical Energy Transition Minerals",
    ],
  },
  {
    name: "ECOSOC",
    topics: [
      "Financing Equitable Access to Artificial Intelligence Computing Infrastructure",
      "Preventing Debt Bondage Through the Regulation of Migrant Worker Recruitment",
    ],
  },
  {
    name: "DISEC",
    topics: [
      "Establishing Standards for Meaningful Human Control over Lethal Autonomous Weapons",
      "Preventing the Proliferation of Weaponized Commercial Drones to Non-State Armed Groups",
    ],
  },
  {
    name: "Security Council",
    topics: [
      "Preventing a Security Vacuum in Southern Lebanon Following the Termination of UNIFIL",
      "Ensuring Accountability and Civilian Protection in Haiti's Gang Suppression Operations",
    ],
  },
];

export const articleMetadata = {
  title: "2027 Theme Details",
  category: {
    title: "Conference",
  },
} satisfies ArticleMetadata;

export default function Article() {
  return (
    <WikiArticle metadata={articleMetadata}>
      <p>
        Thank you for choosing to participate in the 2027 conference! The theme for this year is...
      </p>
      <div className={styles.theme}>
        <span className={styles.quote}>Redefining Responsibilities</span>
        <p className={styles.description}>
          In a world where decisions cross borders and affect multiple
          communities, who bears the consequences and who should respond?
        </p>
      </div>
      
      <p className="pt-8">
        When decisions cross borders and affect communities unequally, who bears
        the consequences? Who should respond?
      </p>
      <p>
        Our interconnected world demands
        that we reconsider how responsibility is assigned, shared, and
        ultimately fulfilled.
      </p>
      
      <h2>Committee Topics</h2>
      <p>Each committee has their own corresponding topics and problems to discuss.</p>
      <div className={styles.committees}>
        {committees.map((committee) => (
          <section className={styles.committee} key={committee.name}>
            <h3>{committee.name}</h3>
            <ol>
              {committee.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </WikiArticle>
  );
}
