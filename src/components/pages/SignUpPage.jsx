import axios from 'axios';
import React, { useState } from 'react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    repeat: '',
  });
  const changeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const isInvalidClass = formData.password === formData.repeat ? 'is-valid' : 'is-invalid';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.repeat) return;

    try {
      const response = await axios.post('/api/auth/signup', formData);
      if (response.status === 200) {
        window.location = '/';
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h2>Sign Up</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                1@1
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputname" className="form-label">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={changeHandler}
                type="text"
                className="form-control"
                id="inputname"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeat" className="form-label">
                Repeat Password
              </label>
              <input
                name="repeat"
                value={formData.repeat}
                onChange={changeHandler}
                type="password"
                className={`form-control ${isInvalidClass}`}
                id="repeat"
              />
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                Passwords do not match
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
