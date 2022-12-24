import React, { useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { emailValidator, passwordValidtor } from "../../utils/form";
import { login } from "../../service/Auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { setCurentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const submit = async (values) => {
    await login({...values})
    .then(res => {
      setCurentUser(res.content);
      messageApi.success('Đăng nhập thành công!');
      setTimeout(() => {
        navigate('/');
      }, 300)
    })
    .catch(() => {
      messageApi.error('Đăng nhập thất bại!');
    });
  };

  const rules = {
    email: [
      { required: true, message: "Please input your Email!" },
      { validator: emailValidator },
    ],
    passWord: [
      { required: true, message: "Please input your Password!" },
      { validator: passwordValidtor },
    ],
  };
  return (
    <div data-aos="fade-right" data-aos-duration="600" data-aos-delay="300">
      {contextHolder}
      <Form
        layout="vertical"
        name="register"
        onFinish={submit}
        onFinishFailed={onFinishFailed}
        className="w-full"
      >
        <Form.Item label="Email" name="email" rules={rules.email}>
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item label="Password" name="passWord" rules={rules.passWord}>
          <Input.Password placeholder="Your Password" />
        </Form.Item>
        <Button
          className="!bg-prim-100 mt-5 h-10 w-32"
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
export default SignIn;
