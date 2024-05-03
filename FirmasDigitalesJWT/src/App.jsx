
import { Button, Divider, Form, Input, message } from 'antd';
import './App.css'
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';


function App() {


  const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw6KxxCdxGBAJyTbnmhzP
  sR0XBwS0f+qsVnVNMGAT84BO0NfJdtEwsxO5bc1NDv9R8kJVB0h9D71lg4ja/DMm
  xM3MubAsM6dQfhdis0CJyHG2V1WFqnv5M5TU6HCC51iyJFn0npH8Fc9GAVBhvUTG
  YRwLSIXUTZLOcKyGshlhv/KfaGYFsfvhhq+677Lbe6FKDa0W+3obNFHiBcXNP75X
  +z6aNz1uabRi3C1FLjo64N7FEvIxT2GAHZCAJv6sSMrjyF8PdMtQ68+nAqli32B2
  qNwGSLKe2OM43o+jEog7oQGA66gtGSP0Y2++25/VGQaLzwSqKwwd93w9aL1APV8D
  uQIDAQAB
  -----END PUBLIC KEY-----`;


  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getUsers = async() => {
    try{
        const response = await fetch('http://localhost:5000/usuarios');
        const data = await response.json();
        console.log(data);
        setUsers(data);
    }
    catch(error){
        console.log(error);
    }
    
    
  }

  const verificarUser = async (values) => {
    try {
      await getUsers(); // Espera a que getUsers() termine de obtener los datos
  
      // Verifica si los valores existen en los datos obtenidos
      const userExists = users.some(user => user.usuario === values.username && user.contrasena === values.password);
  
      if (userExists) {
        sessionStorage.setItem('username', values.username);

        sessionStorage.setItem('publicKey', publicKeyPEM);

        navigate('/messages');
        message.success('Login successful, keys updated.');
      } else {
        // El usuario no existe
        message.error('Username not found.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  


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

      verificarUser(values);

    } catch (error) {
      message.error('Login failed. Could not update keys.');
      console.error('Login Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Failed');
    console.log('Failed:', errorInfo);
  };
  const ingresarSinIniciarSesion = () => {

    sessionStorage.setItem('username', 'guest');

        sessionStorage.setItem('publicKey', 'null');

        navigate('/messages');
        message.success('Login successful.');
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
        <Button type="default" onClick={ingresarSinIniciarSesion}>
          Ingresar sin iniciar sesión
        </Button>
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
};

export default App;
