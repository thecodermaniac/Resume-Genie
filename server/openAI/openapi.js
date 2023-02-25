const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai