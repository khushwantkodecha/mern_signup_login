import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      first_name_error: "",
      last_name_error: "",
      email_error: "",
      password_error: "",
      confirm_password_error: ""
    };
  }

  onChangeHandler = event => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  validateForm = () => {
    let first_name_error = "";
    let email_error = "";
    let password_error = "";
    let confirm_password_error = "";

    if (this.state.first_name.trim().length < 4) {
      first_name_error = "First name should be more than 4 charecters";
    }
    if (!this.state.first_name.trim().length) {
      first_name_error = "First name can not be blank";
    }
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
    if (this.state.confirm_password != this.state.password) {
      confirm_password_error = "Password should be matched!";
    }
    if (!this.state.confirm_password.trim().length) {
      confirm_password_error = "Confirm Password can not be blank";
    }
    if (first_name_error || email_error || password_error || confirm_password_error) {
      this.setState({
        first_name_error,
        email_error,
        password_error,
        confirm_password_error
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
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password
      };
      axios({
        url: "/api/signup",
        method: "POST",
        data: payload
      })
        .then(() => {
          Swal.fire("Success", "User Created successfully!", "success");
          this.clearForm();
          this.props.history.push("/sign-in");
        })
        .catch(() => {
          console.log("data not saved");
        });
    }
  };

  errorReset = () => {
    this.setState({
      first_name_error: "",
      last_name_error: "",
      email_error: "",
      password_error: "",
      confirm_password_error: ""
    });
  };

  clearForm = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 mt-5">
          <h1 className="text-center">REGISTER</h1>
          <p className="text-center">Create your account. It's free and only takes a minute.</p>
          <div className="row mt-3">
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name*"
                  value={this.state.first_name}
                  onChange={this.onChangeHandler}
                ></input>
                {this.state.first_name_error.length ? (
                  <small style={{ color: "red" }}>{this.state.first_name_error}</small>
                ) : null}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={this.onChangeHandler}
                ></input>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email*"
                  value={this.state.email}
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
                  placeholder="Password*"
                  value={this.state.password}
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  value={this.state.confirm_password}
                  placeholder="Confirm Password*"
                  onChange={this.onChangeHandler}
                ></input>
                {this.state.confirm_password_error.length ? (
                  <small style={{ color: "red" }}>{this.state.confirm_password_error}</small>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="form-group text-center">
                <button className="btn btn-primary w-100" onClick={this.sumbitHandler}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <a href="/sign-in" style={{ textDecoration: "none" }}>
                Already have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
