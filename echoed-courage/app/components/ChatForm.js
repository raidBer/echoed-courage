import Metrics from "./Metrics";

const ChatForm = ({ prompt, setPrompt, onSubmit, metrics, completion }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(prompt);
    setPrompt("");
    event.target.rows = 1;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 bg-slate-300 border-t-2">
      <div className="container max-w-2xl mx-auto px-5 pb-8">
        <Metrics
          startedAt={metrics.startedAt}
          firstMessageAt={metrics.firstMessageAt}
          completedAt={metrics.completedAt}
          completion={completion}
        />

        <form className="w-full flex" onSubmit={handleSubmit}>
          <textarea
            autoComplete="off"
            autoFocus
            name="prompt"
            className="overflow-auto resize-none flex-grow block w-full rounded-l-md border-0 py-3 text-gray-900 outline-none focus:outline-none placeholder:text-gray-400 sm:leading-6"
            placeholder="Express yourself!"
            required={true}
            value={prompt}
            rows={1}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
              const lineCount = e.target.value.split("\n").length;
              e.target.rows = lineCount > 10 ? 10 : lineCount;
            }}
          />
          <button
            className="bg-darkGreen hover:bg-darkBlue items-center font-semibold text-white rounded-r-md px-5 py-3"
            type="submit"
          >
            Generate
          </button>
        </form>
      </div>
    </footer>
  );
};

export default ChatForm;
