const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai