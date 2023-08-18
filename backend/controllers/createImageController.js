const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const createImage = async(req,res)=>{

    try {
        const response = await openai.createImage({
            prompt: req.body.prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
          });
        //   console.log(response.data.data[0].b64_json)
          res.json({image :response.data.data[0].b64_json})
    } catch (error) {
        console.log(error.response.data)
        console.log(error)
    }
    
}
module.exports = { createImage }