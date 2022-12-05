import React from "react";
import { ParticlesContainer } from "./components/ParticlesContainer/ParticlesContainer";
import "tachyons";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import "./App.css";

const initialState = {
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

    const route = "/imageUrl";
    const url = 'https://https://jgh-face-detecion-api.herokuapp.com';
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    };

    fetch(`${url}${route}`, options)
      .then((resp) => resp.json())
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
          fetch(`${url}${route}`, options)
            .then((resp) => resp.json())
            .then((count) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count,
                },
              });
            })
            .catch(console.log);
        }
        this.displayFaceConcepts(this.calculateFaceConcepts(response));
      })
      .catch((err) => console.log("error: ", err));

    this.displayModal();
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, data, user } = this.state;

    return (
      <div className="App">
        <ParticlesContainer />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          route={route}
        />
        {route === "home" ? (
          <>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              inputChange={this.onInputChange}
              inputSubmit={this.onPictureSubmit}
            />
            <FaceDetection dataArray={data} imgUrl={imageUrl} />
          </>
        ) : route === "signin" || route === "signout" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
