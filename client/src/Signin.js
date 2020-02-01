import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      email_error: "",
      password_error: "",
      authenticated: "",
      user_found: ""
    };
  }

  onChangeHandler = event => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  validateForm = () => {
    let email_error = "";
    let password_error = "";

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      email_error = "Invalid email";
    }
    if (!this.state.email.trim().length) {
      email_error = "Email can not be blank";
    }
    if (this.state.password.trim().length < 6) {
      password_error = "Password shold be more than 6 characters";
    }
    if (!this.state.password.trim().length) {
      password_error = "Password can not be blank";
    }

    if (email_error || password_error) {
      this.setState({
        email_error,
        password_error
      });
      return false;
    }
    return true;
  };

  sumbitHandler = () => {
    this.errorReset();
    const validated = this.validateForm();
    if (validated) {
      const payload = {
        email: this.state.email,
        password: this.state.password
      };
      axios({
        url: "/api/signin",
        method: "POST",
        data: payload
      })
        .then(res => {
          {
            res.data.err
              ? Swal.fire("Opps...", "User does not exist!", "error")
              : res.data.authenticated
              ? Swal.fire("Success", "User logged in successfully!", "success").then(this.clearForm())
              : Swal.fire("Opps...", "Please enter correct password!", "error");
          }
        })
        .catch(() => {
          console.log("data not saved");
        });
    }
  };

  clearForm = () => {
    this.setState({
      email: "",
      password: ""
    });
  };

  errorReset = () => {
    this.setState({
      email_error: "",
      password_error: ""
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 mt-5">
          <h1 className="text-center">SIGN IN</h1>
          <div className="row mt-3">
            <div className="col-12">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email*"
                  onChange={this.onChangeHandler}
                ></input>
                {this.state.email_error ? <small style={{ color: "red" }}>{this.state.email_error}</small> : null}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password*"
                  onChange={this.onChangeHandler}
                ></input>
                {this.state.password_error.length ? (
                  <small style={{ color: "red" }}>{this.state.password_error}</small>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="form-group text-center">
                <button className="btn btn-primary w-100" onClick={this.sumbitHandler}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <a href="/" style={{ textDecoration: "none" }}>
                Don't have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
