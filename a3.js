const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: "AIzaSyBZwwwBTnhGpsg3U_VsJf-3ZXnL1kb5kvE" });
const base64ImageFile = fs.readFileSync("./p2.jpg", {
    encoding: "base64",
});

const contents = [
    {
        inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
        },
    },
    {
        text: 'response in json if the image has waste or not in given json format {"relevant": boolean_value}'
    },
];

const run = async (image) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
    });
    console.log(response.text);
    return response.text;
};
// const response = await ai.models.generateContent({
//   model: "gemini-2.5-flash",
//   contents: contents,
// });
// console.log(response.text);

// console.log(run(base64ImageFile))

module.exports = run