
import { Button, Divider, Form, Input, message } from 'antd';
import './App.css'
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line no-unused-vars

function App() {

  const navigate = useNavigate();


  const onFinishRegister = async (values) => {
    try {
      // Guardar el username en sessionStorage
      sessionStorage.setItem('username', values.username);
      message.success('Registration successful');
      navigate('/messages');
      //await Register(values.username, values.password);

    } catch (error) {
      message.error('Registration failed');
      console.error('Registration Failed:', error);
    }
  };
  
  const onFinishLogin = async (values) => {
    try {
      sessionStorage.setItem('username', values.username);
      //await LogIn(values.username,values.password);
      navigate('/messages');
      message.success('Login successful, keys updated.');

    } catch (error) {
      message.error('Login failed. Could not update keys.');
      console.error('Login Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Failed');
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='AppBg'>
      <div className='app-grouped-forms'>
        <Form
          className='app-form'
          name='register'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout='horizontal'
          onFinish={onFinishRegister}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <h1>Register</h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Enter your username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ borderColor: 'black'}}></Divider>
        <Form
          className='app-form'
          name='login'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout='horizontal'
          onFinish={onFinishLogin}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <h1>Login</h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Enter your username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            // Continue from the 'Password' Form.Item
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
