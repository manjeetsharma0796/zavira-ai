const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: "AIzaSyBZwwwBTnhGpsg3U_VsJf-3ZXnL1kb5kvE" });
const base64ImageFile = fs.readFileSync("./w11.jpg", {
    encoding: "base64",
});
// console.log(base64ImageFile.slice(0,30), "==================");
const contents = [
    {
        inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
        },
    },
    {
        text: `If the image contains waste or garbage that pollutes environment drastically, respond with 
{"relevant": true}
Otherwise
{"relevant": false}`
    },
];

const run = async (image) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: image,
                },
            },
            {
                text: `If the image contains waste or garbage that pollutes environment drastically, respond with {"relevant": true}
Otherwise {"relevant": false}`
            }]
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