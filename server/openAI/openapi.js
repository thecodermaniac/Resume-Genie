const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai