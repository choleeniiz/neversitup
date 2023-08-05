import { TeamOutlined } from "@ant-design/icons"
import Layout from "../../components/Layout"
import { Button, Form, Input } from "antd"
import { useNavigate } from 'react-router-dom'
import { ILogin } from "../../interfaces/login.interface"
import { login } from "../../actions/auth"
import { UserStore } from "../../stores/user.store"
const { Item } = Form

const Login = () => {
    const navigate = useNavigate()
    const { setAccessToken } = UserStore()


    const handleOnSubmit = async (values: ILogin) => {
        try {
          const { data } = await login(values)
          if (data) {
            setAccessToken(data.token)
            navigate('/')
          }
        } catch (error) {
          console.log(error)
        }
      }

    return   <Layout title="Todo List">
    <div className="flex flex-col items-center justify-center h-96 w-screen m-3 bg-white rounded-lg">
      <div className="flex justify-center items-center p-3 text-xl">
        <TeamOutlined className='mr-3'/> Todo List
      </div>
      <Form layout="vertical" onFinish={handleOnSubmit} className="w-full p-6">
        <Item
          label="username"
          name="username"
          rules={[
            { required: true, message: 'กรุณากรอกชื่อผู้ใช้' },
          ]}
        >
          <Input size="large" />
        </Item>
        <Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
        >
          <Input type="password" size="large" />
        </Item>

        <div className="grid grid-cols-1 gap-3">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full bg-primary border-none rounded"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  </Layout>
}

export default Login