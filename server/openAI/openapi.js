const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai