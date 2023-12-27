import { TelegramIcon, TwitterIcon } from "react-share";

const Message = ({ message, isUser }) => {
  let containerClass = "bg-darkWhite";
  if (isUser) {
    containerClass = "";
  }

  if (Array.isArray(message)) {
    message = message.join("");
  }

  if (!message || message === "") {
    return null;
  }

  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(message);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnTelegram = () => {
    const telegramText = encodeURIComponent(message);
    const telegramUrl = `https://t.me/share/url?url=${telegramText}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div
      className={`flex gap-x-4 rounded-md ${containerClass} py-5 px-5 mb-12`}
    >
      {isUser ? (
        <span className="sm:text-2xl" title="user">
          👤
        </span>
      ) : (
        <span className="text-xl sm:text-2xl" title="AI">
          🤖
        </span>
      )}

      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1 text-justify">
        {message.split("\n").map(
          (text, index) =>
            text.length > 0 && (
              <span key={index} className="min-w-0">
                {text}
              </span>
            )
        )}
      </div>

      {!isUser && (
        <div className="flex items-center justify-center">
          <button onClick={shareOnTelegram}>
            <TelegramIcon size={40} />
          </button>
          <button onClick={shareOnTwitter}>
            <TwitterIcon size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
