const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai