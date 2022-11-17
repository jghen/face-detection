import React from "react";
import { ParticlesContainer } from "./components/ParticlesContainer/ParticlesContainer";
import Clarifai from "clarifai";
import "tachyons";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "85708f6c5a29471e8ecaa002f44f985c",
});

// const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key 85708f6c5a29471e8ecaa002f44f985c");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      data: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    const { id, name, email, entries, joined } = data;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
      },
    });
  };

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

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    this.hideModal();

    // stub.PostModelOutputs(
    //   {
    //     // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
    //     model_id: "aaa03c23b3724a16a56b629203edc62c",
    //     inputs: [{ data: { image: { url: `${this.state.input}` } } }],
    //   },
    //   metadata,
    //   (err, response) => {
    //     if (err) {
    //       console.log("Error: " + err);
    //       return;
    //     }

    //     if (response.status.code !== 10000) {
    //       console.log(
    //         "Received failed status: " +
    //           response.status.description +
    //           "\n" +
    //           response.status.details
    //       );
    //       return;
    //     }

    //     console.log("Predicted concepts, with confidence values:");
    //     for (const c of response.outputs[0].data.concepts) {
    //       console.log(c.name + ": " + c.value);
    //     }
    //   }
    // );

    app.models
      .predict("aaa03c23b3724a16a56b629203edc62c", this.state.input)
      .then((response) => {
        if (response) {
          const route = "/image";
          const options = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          };
          fetch(`http://localhost:5000${route}`, options)
            .then((resp) => resp.json())
            .then((count) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count,
                },
              });
            });
        }
        this.displayFaceConcepts(this.calculateFaceConcepts(response));
      })
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
    const { isSignedIn, imageUrl, route, data, user } = this.state;
    console.log(route);

    return (
      <div className="App">
        <ParticlesContainer />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          route={route}
        />
        {route === "home" 
          ? <>
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                inputChange={this.onInputChange}
                inputSubmit={this.onPictureSubmit}
              />
              <FaceDetection dataArray={data} imgUrl={imageUrl} />
            </>
          : ( 
            route === "signin" || route === 'signout'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          )
        }
      </div>
    );
  }
}

export default App;
