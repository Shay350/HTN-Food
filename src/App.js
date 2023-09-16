import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <!DOCTYPE html> */}
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="mainStyle.css" />

        {/* <!-- Fonts --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
        />
        <title>HTN Food App</title>
    </head>
    <body>
        <div id="main-container">
            <div id="header" class="h-flex">
                <div id="coin-container">
                    <img src="images/coin.webp" alt="coin" />
                    <p>214</p>
                </div>
            </div>

            <div id="pet-container" class="v-flex">
                <h2>Eat before [pet name] gets hungry!</h2>
                <h3>02:43</h3>
                <img src="images/cat_happy.png" alt="" />

                {/* <!-- Hunger bar --> */}
                <div class="w3-light-grey rounded-hunger-bar">
                    <div class="w3-green" id="hungerBar"></div>
                </div>

                {/* <!-- Feed button --> */}
                <form name="feed-button-form">
                    <div class="button-container">
                        <label id="feed-button" for="imageInput"> Feed [pet name] </label>
                        <input type="file" id="imageInput" accept="image/*" />
                    </div>
                </form>

                <div id="imagePreview"></div>
            </div>
        </div>
    </body>
</html>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
