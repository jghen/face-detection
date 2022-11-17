import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };
  onSubmitSignin = (event) => {
    if (
      (event.key === "Enter" && event.type === "keyup") ||
      event.type === "click"
    ) {
      const route = "/signin";
      const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      };
      fetch(`http://localhost:5000${route}`, options)
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
            return;
          }
          this.displayErrorMessage();
          return; //if not success return
        });

      // if password or email not correct
      //return and somethin

      //if password is correct
    }
    return;
  };
  componentDidMount() {
    window.addEventListener("keyup", this.onSubmitSignin);
  }
  componentWillUnmount() {
    this.removeEventListenerSignin();
  }
  removeEventListenerSignin() {
    window.removeEventListener("keyup", this.onSubmitSignin);
  }
  displayErrorMessage() {
    document.querySelector("#errorContainer").textContent =
      "wrong username or password";
    return;
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br2 ba b--black-10 w-100 w-50-m w-25-l center bg-white-90">
        <main className="pa4 black-80">
          <section className="signin-form measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Logg Inn</legend>
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
            <div className="">
              <input
                onClick={this.onSubmitSignin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Logg inn"
              />
            </div>
            <p id="errorContainer" className="red ma0"></p>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link black db pointer underline-hover"
              >
                Registrer deg!
              </p>
            </div>
          </section>
        </main>
      </article>
    );
  }
}

export default Signin;
