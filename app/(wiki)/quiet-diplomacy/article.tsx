import WikiArticle, { type ArticleMetadata } from "../WikiArticle";

export const articleMetadata = {
  title: "A guide to quiet diplomacy",
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
        Good debate begins before the first speech. A few notes on listening
        closely, finding common ground, and making your first committee feel a
        little more familiar.
      </p>
      <p>
        Model United Nations is a space to explore how countries work together.
        You represent a perspective, test ideas with other delegates, and turn a
        room full of different priorities into a shared proposal. This handbook
        is a starting point.
      </p>
      <blockquote>
        <p>
          You do not need to have every answer. Start with a thoughtful
          question.
        </p>
      </blockquote>
      <h2>Before you enter the room</h2>
      <p>
        Begin with the issue rather than the speech. Read your committee’s
        background guide, identify the central disagreement, and ask why it
        matters to the country you represent.
      </p>
      <ul>
        <li>
          <strong>Know your position.</strong> What has your country said or
          done about this issue?
        </li>
        <li>
          <strong>Know your priorities.</strong> Which outcomes would you
          support, and where could you compromise?
        </li>
        <li>
          <strong>Bring a proposal.</strong> A specific, workable idea is a
          useful place to begin a conversation.
        </li>
      </ul>
      <h2>Listen before you respond</h2>
      <p>
        A committee is a conversation, even when it takes the form of formal
        speeches. Keep track of what other delegates want. Listen for the
        interests behind their statements, and notice where those interests
        overlap with yours.
      </p>
      <h3>Find the shared interest</h3>
      <p>
        Two countries may disagree about a policy while agreeing on its purpose.
        Start there. Ask what a proposal needs to achieve, then discuss how it
        might work.
      </p>
      <h3>Make space for others</h3>
      <p>
        Invite quieter delegates into the discussion. Ask a follow-up question.
        The strongest proposal often grows from an idea that needed a little
        more room to develop.
      </p>
      <h2>Turn ideas into action</h2>
      <p>
        Move from broad intentions to practical choices. A useful proposal
        explains who will act, what they will do, and how the committee could
        tell whether it worked.
      </p>
      <table>
        <thead>
          <tr>
            <th>Start with a question</th>
            <th>Make it concrete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Who can help?</td>
            <td>Name an appropriate institution or partner.</td>
          </tr>
          <tr>
            <td>What needs to happen?</td>
            <td>Describe a specific action and its intended outcome.</td>
          </tr>
          <tr>
            <td>How will it last?</td>
            <td>Consider resources, oversight, and review.</td>
          </tr>
        </tbody>
      </table>
      <h2>Keep exploring</h2>
      <p>
        Ready for the next step? Read about{" "}
        <a href="/silver-olive">writing a resolution</a>, or explore the{" "}
        <a href="/paper-lantern">TSX authoring example</a> to see how this
        handbook is put together.
      </p>
    </WikiArticle>
  );
}
