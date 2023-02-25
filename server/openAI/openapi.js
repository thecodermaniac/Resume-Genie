const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai