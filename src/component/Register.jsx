import { useState } from "react";
import { Form } from "react-bootstrap";

const Register = (props) => {
  const signUp = (e) => {
    console.log(e);
  };

  const handleChange = (e, fieldName) => {
    console.log(fieldName);
    console.log(e.target.value);
    if (fieldName === "name")
      props.addLogUpInfo({ ...props.logUpInpits, name: e.target.value });
    if (fieldName === "email")
      props.addLogUpInfo({ ...props.logUpInpits, email: e.target.value });
    if (fieldName === "password")
      props.addLogUpInfo({ ...props.logUpInpits, password: e.target.value });
  };

  return (
    <>
      {/* <form onSubmit={signUp}> */}
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingNameCustom"
          type="text"
          placeholder="Name"
          onChange={(e) => handleChange(e, "name")}
        />
        <label htmlFor="floatingInputCustom">Name</label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          onChange={(e) => handleChange(e, "email")}
        />
        <label htmlFor="floatingInputCustom">Email address</label>
      </Form.Floating>
      <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange(e, "password")}
        />
        <label htmlFor="floatingPasswordCustom">Password</label>
      </Form.Floating>
      {/* </form> */}
    </>
  );
};

export default Register;
