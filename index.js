import express from "express";
import router from "./router.js";
import fileUpload from "express-fileupload";
import cors from 'cors';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);

async function startApp() {
  try {
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
