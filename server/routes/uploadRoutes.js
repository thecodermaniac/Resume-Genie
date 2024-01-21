import { Router } from "express";
const router = Router();
import { extname } from "path";
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import axios from "axios";
const generateID = () => Math.random().toString(36).substring(2, 10);
//mutler configure

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
    if (!existsSync("uploads")) {
      mkdirSync("uploads");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

//mutler configure

const getObjective = async (text) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
    {
      inputs: text,
      parameters: {
        temperature: 1.0,
        max_new_tokens: 250,
        return_full_text: false,
        max_time: 10,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGFACE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data[0].generated_text;
};

const getKeyPoints = async (text) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
    {
      inputs: text,
      parameters: {
        temperature: 0.6,
        repetition_penalty: 1,
        max_new_tokens: 250,
        return_full_text: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGFACE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const answer = response.data[0].generated_text;
  const array = answer
    ?.split("\n")
    .filter((value) => value.length >= 4)
    .map((value) => value.trim());

  return array.join("\n");
};

const getKeyResponsibilities = async (text) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
    {
      inputs: text,
      parameters: {
        temperature: 0.6,
        repetition_penalty: 1,
        max_new_tokens: 250,
        return_full_text: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGFACE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const answer = response.data[0].generated_text;
  const array = answer
    ?.split("\n")
    .filter((value) => value.length >= 4)
    .map((value) => value.trim());

  return array.join("\n");
};

router.post(
  "/resume/create",
  upload.single("headshotImage"),
  async (req, res) => {
    try {
      const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
      } = req.body;

      const workArray = JSON.parse(workHistory);
      const newEntry = {
        id: generateID(),
        fullName,
        image_url: `http://localhost:3001/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
      };
      const question1 = `I am writing a resume, my details are name: ${fullName}: ${currentPosition} (${currentLength} years). I use technolegies like ${currentTechnologies}. Write a 100 words description for the top of the resume in first person`;
      const question2 = `I am writing a resume, my details are  name: ${fullName}  role: ${currentPosition} (${currentLength} years). I use technolegies like ${currentTechnologies}.Write 10 points for a resume of my skills in first person`;
      const remainderText = () => {
        let stringText = "";
        for (let i = 0; i < workArray.length; i++) {
          stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
        }
        return stringText;
      };
      const question3 = `I am writing a resume, my work experience is as follow :- During my years I worked at ${
        workArray.length
      } companies. ${remainderText()}. Write me 50 words for each company for the responsibilities I handled in respective role in first person`;
      const objective = await getObjective(question1);
      const keypoints = await getKeyPoints(question2);
      const jobResponsibilities = await getKeyResponsibilities(question3);

      const resumeData = { objective, keypoints, jobResponsibilities };
      const data = { ...newEntry, ...resumeData };
      console.log(data);
      if (data == null) {
        throw {
          statusCode: 400,
          message: "something went wrong",
        };
      }
      // database.push(data);

      res.json({
        message: "Request successful!",
        data,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }

    // database.push(data);
  }
);

export default router;
