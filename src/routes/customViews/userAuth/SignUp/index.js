import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { hideMessage, showAuthLoader, userSignIn } from "appRedux/actions/Auth";

const FormItem = Form.Item;

const SignUP = () => {
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log("finish", values);
    dispatch(showAuthLoader());
    dispatch(userSignIn(values));
  };

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign Up</h1>
        </div>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <FormItem
            rules={[
              { required: true, message: "Please input your username!'}" },
            ]}
            name="uaername"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: "Please input your E-mail!" }]}
            name="email"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: "Please input your Password!" }]}
            name="password"
          >
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem
            rules={[{ required: true, message: "Please input your Password!" }]}
            name="confirm-password"
          >
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Confirm Password"
            />
          </FormItem>

          <FormItem name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            <Link
              className="gx-login-form-forgot"
              to="/custom-views/user-auth/forgot-password"
            >
              Forgot password
            </Link>
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default SignUP;
