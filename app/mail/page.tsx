import { getRecentLetter } from "../actions/letters";
import ReadOnlyEditor from "../../components/ReadOnlyEditor";

const Read = async () => {
  const readOnlyContent = await getRecentLetter();

  return (
    <div>
      <ReadOnlyEditor readOnlyContent={readOnlyContent} />
    </div>
  );
};

export default Read;

// className="h-full overflow-y-auto text-text font-sans"
