import cors from "cors";
import express from "express";
import multer from "multer"; // Add multer for handling file uploads
export const app = express();
app.use(cors());
app.use(express.json());

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

const port = 8000;

// Start web app
app.get("/", (req, res) => {
  // res.send("Hello World");
  //get requests to the root ("/") will route here
  // res.sendFile("./views/index.html", {
  //   root: __dirname,
  // }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});

app.get("/test", (request, response) => {
  // response.json({ testValue: "WOOOOO the express server is UPPPPP" });
  response.json({ value: "test server scenario" });
});

// POST endpoint for handling image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  // Access the uploaded image data from req.file.buffer
  const imageData = req.body;
  // console.log(req.body);

  // Process and store the image data as needed
  // For example, you can save it to a file, upload it to a cloud storage service, or process it with a Google Cloud service.

  // Respond to the client with a success message or any other relevant response
  if (imageData) {
    res.json({ message: "Image uploaded successfully" });
  } else {
    res.json({ message: "Not success" });
  }
  // res.json({ message: "Image uploaded successfully" });
});
