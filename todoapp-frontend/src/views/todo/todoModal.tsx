import { Form, Input, Modal } from "antd"
import { TodoStore } from "../../stores/todo.store"
import { ITodo, ITodoReq } from "../../interfaces/todo.interface"
import { useEffect } from "react"
import { createTodo, updateTodo } from "../../actions/todo"

const { Item } = Form

interface IProps {
  todo?: ITodo
  handleFetch: () => void
  handleClearModal: () => void
}

const TodoCreate = (props: IProps) => {
  const { todo, handleFetch, handleClearModal } = props
  const { modalVisible, setModalVisible } = TodoStore()
  const [form] = Form.useForm()

  useEffect(() => {
    setModalVisible(false)
    form.resetFields();
    if (todo) {
      form.setFieldsValue(todo)
    }
  }, []);

  useEffect(() => {
    form.resetFields();
    if (todo) {
      form.setFieldsValue(todo)
    }
  }, [todo]);

  const onCreate = async (values: ITodoReq) => {
    try {
      const { data } = await createTodo(values)
      if (data) {
        setModalVisible(false)
        handleFetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async (values: ITodoReq) => {
    try {
      if (todo) {
        const { data } = await updateTodo(todo._id, values)
        if (data) {
          setModalVisible(false)
          handleFetch()
        }
      }
    } catch (error) {
      console.log(error)
      form.resetFields();
      setModalVisible(false)
    }
  }

  const onCancel = () => {
    handleClearModal()
    setModalVisible(false)
  }

  return <Modal
    open={modalVisible}
    title={`${todo ? 'Edit' : 'Create'} Todo List `}
    onCancel={onCancel}
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          todo ? onUpdate(values) : onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }}
  >
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      >
      <Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
        >
        <Input />
      </Item>
      <Item name="description" label="Description">
        <Input.TextArea />
      </Item>
    </Form>
  </Modal>
}

export default TodoCreate

