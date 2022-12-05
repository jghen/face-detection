import React from "react";
import { validateEmail, validatePassword, validateName } from "../../utils/checkCredentials.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = (event) => {
    const {email, name, password} = this.state;

    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) {
      return this.displayErrorMessage()
    }
    
    if (
      (event.key === "Enter" && event.type === "keyup") ||
      event.type === "click"
    ) {
      const route = "/register";
      const url = 'https://https://jgh-face-detecion-api.herokuapp.com';
      const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      };
      fetch(`${url}${route}`, options)
        .then((response) => response.json())
        .then((user) => {
          if (user.id && validateName(name) && validateEmail(email) && validatePassword(password)) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
            return;
          }
          this.displayErrorMessage();
          return; //if not success return
        })
        .catch(console.log);
    }
    return;
  };
  componentDidMount() {
    window.addEventListener("keyup", this.onSubmitRegister);
  }
  componentWillUnmount() {
    this.removeEventListenerRegister();
  }
  removeEventListenerRegister() {
    window.removeEventListener("keyup", this.onSubmitRegister);
  }

  displayErrorMessage() {
    document.querySelector("#errorContainer").textContent =
      "Kan ikke registrere.\r\nBrukeren eksisterer allerede eller du \r\ntastet et ugyldig epost eller passord: \r\n- Passord må være lengre enn 6 \r\n- Passord må inneholde et tall";
    return;
  }
  render() {
    return (
      <article className="br2 ba b--black-10 w-100 w-50-m w-25-l center bg-white-90">
        <main className="pa4 black-80">
          <section className=" register-form measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Registrer</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Navn
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  E-post
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Passord
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <p id="errorContainer" style={{whiteSpace: 'pre'}} className="red ma0"></p>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Registrer!"
              />
            </div>
          </section>
        </main>
      </article>
    );
  }
}

export default Register;
