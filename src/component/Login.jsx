import { Form } from "react-bootstrap";

const Login = (props) => {
  // const signIn = (e) => {};
  const handleChange = (e, fieldName) => {
    if (fieldName === "email")
      props.addLogInInfo({ ...props.logInInpits, email: e.target.value });
    if (fieldName === "password")
      props.addLogInInfo({ ...props.logInInpits, password: e.target.value });
  };

  return (
    <>
      <form>
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
      </form>
    </>
  );
};

export default Login;
