import { LlamaTemplate } from "../utils/prompt_template.js";

const llamaTemplate = LlamaTemplate();

const MODELS = [
  {
    id: "meta/llama-2-7b-chat",
    name: "Llama 2 7B",
    shortened: "7B",
  },
  {
    id: "meta/llama-2-13b-chat",
    name: "Llama 2 13B",
    shortened: "13B",
  },
  {
    id: "meta/llama-2-70b-chat",
    name: "Llama 2 70B",
    shortened: "70B",
  },
];

const generatePrompt = (template, systemPrompt, messages) => {
  const chat = messages.map((message) => ({
    role: message.isUser ? "user" : "assistant",
    content: message.text,
  }));

  return template([
    {
      role: "system",
      content: systemPrompt,
    },
    ...chat,
  ]);
};

export default function HomePage() {
  const MAX_TOKENS = 4096;
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [starting, setStarting] = useState(false);
  const [shortStory, setShortStory] = useState(true);

  //   Llama params
  const [model, setModel] = useState(MODELS[2]); // default to 70B
  const [systemPrompt, setSystemPrompt] = useState(
    `You're talking to a traumatized war victim, the victim can only communicate with a few words, you should generate a ${
      !shortStory && "very"
    } short story based on the victim's input, use "I" pronoun, do not add any details that are not mentioned in the input.`
  );
  const [temp, setTemp] = useState(0.75);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(800);

  const [metrics, dispatch] = useReducer(metricsReducer, {
    startedAt: null,
    firstMessageAt: null,
    completedAt: null,
  });

  const { complete, completion, setInput, input } = useCompletion({
    api: "/api",
    body: {
      model: model.id,
      systemPrompt: systemPrompt,
      temperature: parseFloat(temp),
      topP: parseFloat(topP),
      maxTokens: parseInt(maxTokens),
    },

    onError: (error) => {
      setError(error);
    },
    onResponse: (response) => {
      setStarting(false);
      setError(null);
      dispatch({ type: "FIRST_MESSAGE" });
    },
    onFinish: () => {
      dispatch({ type: "COMPLETE" });
    },
  });

  const setAndSubmitPrompt = (newPrompt) => {
    handleSubmit(newPrompt);
  };

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    setSystemPrompt(event.target.systemPrompt.value);
  };

  const handleSubmit = async (userMessage) => {
    setStarting(true);
    const SNIP = "<!-- snip -->";

    const messageHistory = [...messages];
    if (completion.length > 0) {
      messageHistory.push({
        text: completion,
        isUser: false,
      });
    }
    messageHistory.push({
      text: userMessage,
      isUser: true,
    });

    // generate initial prompt and calculate tokens
    let prompt = `${generatePrompt(
      llamaTemplate,
      systemPrompt,
      messageHistory
    )}\n`;

    // check if we exceed max tokens and truncate the message history if so.
    while (countTokens(prompt) > MAX_TOKENS) {
      if (messageHistory.length < 3) {
        setError(
          "Your message is too long. Please try again with a shorter message."
        );

        return;
      }

      // remove the third message from history, keeping the original exchange.
      messageHistory.splice(1, 2);

      // recreate the prompt
      prompt = `${SNIP}\n${generatePrompt(
        llamaTemplate,
        systemPrompt,
        messageHistory
      )}\n`;
    }

    setMessages(messageHistory);

    dispatch({ type: "START" });

    complete(prompt);
  };

  useEffect(() => {
    if (messages?.length > 0 || completion?.length > 0) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, completion]);
}
