import { getRecentLetter } from "../actions/letters";
import ReadOnlyEditor from "../../components/ReadOnlyEditor";

const Read = async () => {
  const recentLetter = await getRecentLetter();

  console.log("recentLetter", recentLetter);
  if ("message" in recentLetter) {
    return (
      <div className="h-full overflow-y-auto text-text font-sans border border-light rounded-xl p-4 md:p-8">
        {recentLetter.message}
      </div>
    );
  }

  const content = JSON.parse(recentLetter.content);
  console.log("content", content);
  return (
    <div className="h-full overflow-y-auto text-text font-sans border border-light rounded-xl p-4 md:p-8">
      <ReadOnlyEditor readOnlyContent={content} />
    </div>
  );
};

export default Read;
