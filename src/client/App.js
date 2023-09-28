import React, { useState, useEffect } from "react";

import "./mainStyle.css"; // Import your CSS file here

function App() {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

  const [date, setDate] = useState(new Date());

  const timer = 15;
  const [remainingTime, setRemainingTime] = useState(timer);

  const [selectedImage, setSelectedImage] = useState(null);
  // Function to trigger the file input when the button is clicked
  const loadImgPreview = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  //Function to post img to server
  // const postToServer = (event) => {

  // }
  // Function after API response
  //function foodProbability() {}

  // Function to handle file selection and display the image preview
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setSelectedImage(imageUrl); // Update the selectedImage state with the image URL
      };

      reader.readAsDataURL(file);

      // fileAsBlob = Blob(file);
      console.log(file);

      const api_user_token = "e007af8f2be5fd230bb89277c8341510af5fea3d";

      var data = new FormData();
      data.append("image", file);

      const headers = {
        Authorization: `Bearer ${api_user_token}`,
      };
      fetch("https://api.logmeal.es/v2/image/segmentation/complete", {
        method: "POST",
        headers: headers,
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.segmentation_results);
          if (data.segmentation_results[0].recognition_results[0].prob < 0.38) {
            alert(
              "This does not appear to be a food item. Please load another image"
            );
            setSelectedImage("");
          } else {
            alert("This appears to be food. Great work!");
          }
        });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [hungerBarPct, setHungerBarPct] = useState(100);

  const [coins, setCoinCount] = useState(200);

  function updateHungerBar(addMeal = false) {
    if (addMeal) {
      setHungerBarPct(Math.min(100, hungerBarPct + 25));
      setCoinCount(coins + 25);
      setSelectedImage("");
    } else {
      setHungerBarPct(Math.max(0, hungerBarPct - 25));
    }
  }

  // when meal is skipped call skipMeal()
  function CountdownTimer() {
    useEffect(() => {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          // Prevent the timer from going negative
          if (prevTime <= 0) {
            skipMeal();
          }
          return prevTime - 1; // Decrement the remaining time by 1 second
        });
      }, 1000); // Update every 1 second

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [remainingTime]);
  }

  CountdownTimer();

  function skipMeal() {
    updateHungerBar();
    setRemainingTime(timer);
  }

  function addMeal() {
    updateHungerBar(true);
    setRemainingTime(timer);
  }

  // addMealButton.addEventListener("click", function () {
  //   addMeal();
  // });
  let hungerBarClasses = [];
  let statusappearance = document.getElementById("statusappearance");
  if (hungerBarPct <= 50 && hungerBarPct > 25) {
    // hungerBarClasses.remove("danger", "critical");
    // hungerBarClasses.add("warning");
    hungerBarClasses = ["warning"];
    statusappearance?.setAttribute("src", "/images/cat_hungry.png");
  } else if (hungerBarPct <= 25 && hungerBarPct > 0) {
    // hungerBarClasses.remove("warning", "critical");
    // hungerBarClasses.add("danger");
    hungerBarClasses = ["danger"];
    statusappearance?.setAttribute("src", "/images/cat_sad.png");
  } else if (hungerBarPct === 0) {
    // hungerBarClasses.remove("danger", "warning");
    //hungerBarClasses.add("critical");
    hungerBarClasses = ["critical"];
    statusappearance?.setAttribute("src", "/images/cat_cry.png");
  } else if (hungerBarPct >= 75 && hungerBarPct < 100) {
    // hungerBarClasses.remove("danger", "warning");
    //hungerBarClasses.add("critical");
    hungerBarClasses = ["justOk"];
    statusappearance?.setAttribute("src", "/images/cat_smile.png");
  } else {
    // hungerBarClasses.remove("warning", "danger", "critical");
    hungerBarClasses = [];
    statusappearance?.setAttribute("src", "/images/cat_happy.png");
  }

  // function doSomething() {
  //   fetch("http://localhost:8000/upload")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Import your fonts and set the title here */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <button onClick={doSomething}>Click here</button> */}
        <div id="main-container">
          {/* <button onClick={doSomething}>Click here</button> */}
          <div id="header" className="h-flex">
            <div id="coin-container">
              <img src="images/coin.webp" alt="coin" />
              <p>{coins}</p>
            </div>
          </div>

          <div id="pet-container" className="v-flex">
            <h2>Eat before Mimi gets hungry!</h2>

            <h2>Countdown Timer</h2>
            <div>
              <span>{hours.toString().padStart(2, "0")}:</span>
              <span>{minutes.toString().padStart(2, "0")}:</span>
              <span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <img id="statusappearance" src="/images/cat_happy.png" />

            {/* Hunger bar */}
            <div className="w3-light-grey rounded-hunger-bar">
              <div
                className={`w3-green ${hungerBarClasses.join(" ")}`}
                style={{
                  width: `${hungerBarPct}%`,
                }}
              >
                {hungerBarPct}%
              </div>
            </div>

            {/* Feed button */}

            <div className="button-container">
              <label id="feed-button" htmlFor="imageInput">
                Upload food picture
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelection}
              />
            </div>

            {/* Display the selected image preview */}
            <div id="imagePreview">
              {selectedImage && (
                <img
                  className="preview-img"
                  src={selectedImage}
                  alt="Uploaded Image Preview"
                  width="200" // Set the desired width for the preview
                  height="200" // Set the desired height for the preview
                />
              )}
            </div>

            <div>
              <button onClick={skipMeal}>Skip meal</button>
              <button onClick={addMeal}>Add meal</button>
            </div>

            {/* <button onClick={postToServer}>Submit</button> */}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
