import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";

const token = process.env.NEXT_REPLICATE_API_TOKEN;
const replicate = new Replicate({
  auth: token,
});

if (!token) {
  throw new Error("set NEXT_REPLICATE_API_TOKEN");
}

export async function POST(req) {
  const params = await req.json();

  let response = await runLlama({ ...params, model: "meta/llama-2-70b-chat" });

  // convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // respond with the stream
  return new StreamingTextResponse(stream);
}

async function runLlama({ model, prompt, maxTokens, temperature, topP }) {
  console.log("model:", model);

  return await replicate.predictions.create({
    model: model,
    stream: true,
    input: {
      prompt: `${prompt}`,
      prompt_template: "{prompt}",
      max_new_tokens: maxTokens,
      temperature: temperature,
      repetition_penalty: 1,
      top_p: topP,
    },
  });
}
