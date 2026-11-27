import WikiArticle, { type ArticleMetadata } from "../WikiArticle";

export const articleMetadata = {
  title: "From an idea to a resolution",
  category: {
    title: "Resources",
    link: "/",
    children: { title: "Delegate preparation", link: "/quiet-diplomacy" },
  },
} satisfies ArticleMetadata;

export default function Article() {
  return (
    <WikiArticle metadata={articleMetadata}>
      <p>
        A short field guide to turning a promising conversation into a proposal
        other delegates can understand and support.
      </p>
      <h2>Begin with the problem</h2>
      <p>
        Write down the problem in one sentence. Keep it specific enough that
        your committee can discuss meaningful action. This is demo copy; use
        your conference’s own rules and background guide when preparing.
      </p>
      <h2>Build the proposal</h2>
      <p>
        Separate the context from the action. Explain why the issue matters,
        then describe what you want to happen.
      </p>
      <ol>
        <li>Identify the institution responsible for the action.</li>
        <li>Describe the proposed programme or change.</li>
        <li>Explain how it will be supported and reviewed.</li>
      </ol>
      <blockquote>
        <p>A clear clause should help the reader picture what happens next.</p>
      </blockquote>
      <h2>Review together</h2>
      <p>
        Read the draft aloud with your collaborators. Replace vague language,
        check for contradictions, and make sure everyone understands the
        commitments they are supporting.
      </p>
      <p>
        Return to <a href="/quiet-diplomacy">quiet diplomacy</a> for notes on
        finding common ground.
      </p>
    </WikiArticle>
  );
}
