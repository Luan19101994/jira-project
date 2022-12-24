import React, { useEffect } from "react";
import { Button, Form, Input,  message } from "antd";
import {
  emailValidator,
  passwordValidtor,
  phoneNumberValidtor,
} from "../../utils/form";
import { signUp } from "../../service/Auth";
import { useNavigate } from "react-router-dom";
import AOS from "aos";

function SignIn() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const submit = async (values) => {
    await signUp({...values})
    .then(res => {
      messageApi.success('Đăng ký thành công! Mời bạn đăng nhập');
      setTimeout(() => {
        navigate('/');
      }, 300)
    })
    .catch(() => {
      messageApi.error('Đăng nhập thất bại!');
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
    name: [{ required: true, message: "Please input your Name!" }],
    phoneNumber: [
      { required: true, message: "Please input your Phone Number!" },
      { validator: phoneNumberValidtor },
    ],
  };

  useEffect(() => {
    AOS.init({ offset: 100, delay: 0 });
  }, []);

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
        <Form.Item label="Full name" name="name" rules={rules.name}>
          <Input placeholder="Your Name" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={rules.phoneNumber}
        >
          <Input placeholder="Your Number Phone" />
        </Form.Item>
        <Button
          className="mt-5 h-10 !bg-prim-100 w-32"
          type="primary"
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
export default SignIn;
