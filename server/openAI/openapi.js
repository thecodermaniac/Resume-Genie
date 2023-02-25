const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai;
