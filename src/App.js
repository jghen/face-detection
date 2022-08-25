import React from "react";
import { ParticlesContainer } from "./components/ParticlesContainer/ParticlesContainer";
import Clarifai from "clarifai";
import "tachyons";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "85708f6c5a29471e8ecaa002f44f985c",
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      data: [],
      route: "signin",
      isSignedIn: false,
    };
  }

  displayModal = () => {
    const faceDetectionModal = document.querySelector(".faceDetectionModal");
    faceDetectionModal.classList.remove("hide");
    faceDetectionModal.classList.add("display");
  };

  hideModal = () => {
    const faceDetectionModal = document.querySelector(".faceDetectionModal");
    faceDetectionModal.classList.remove("display");
    faceDetectionModal.classList.add("hide");
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceConcepts = (data) => {
    const concepts = data.outputs[0].data.concepts;
    return concepts;
  };

  displayFaceConcepts = (concepts) => {
    this.setState({ data: concepts });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    this.hideModal();

    app.models
      .predict("aaa03c23b3724a16a56b629203edc62c", this.state.input)
      .then((response) =>
        this.displayFaceConcepts(this.calculateFaceConcepts(response))
      )
      .catch((err) => console.log("error: ", err));

    this.displayModal();
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, data } = this.state;

    return (
      <div className="App">
        <ParticlesContainer />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              inputChange={this.onInputChange}
              inputSubmit={this.onButtonSubmit}
            />
            <FaceDetection dataArray={data} imgUrl={imageUrl} />
          </>
        ) : route === "register" ? (
          <Register onRouteChange={this.onRouteChange} />
        ) : (
          <Signin onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
