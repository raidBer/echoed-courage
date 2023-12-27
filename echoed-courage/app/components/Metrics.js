import { countTokens } from "../../utils/tokenizer";

export default function Metrics({
  startedAt,
  firstMessageAt,
  completedAt,
  completion,
}) {
  const timeToFirstToken =
    firstMessageAt && startedAt
      ? (new Date(firstMessageAt) - new Date(startedAt)) / 1000.0
      : null;
  const tokenCount = completion && countTokens(completion);
  const runningDuration = firstMessageAt
    ? ((completedAt ? new Date(completedAt) : new Date()) -
        new Date(firstMessageAt)) /
      1000.0
    : null;
  const tokensPerSecond =
    tokenCount > 0 && runningDuration > 0 && tokenCount / runningDuration;
}
