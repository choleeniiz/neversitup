import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import { getAllTodo } from "../../actions/todo"
import { ITodo } from "../../interfaces/todo.interface"
import dayjs from "dayjs"
import { TodoStore } from "../../stores/todo.store"
import TodoModal from "./todoModal"
import { CloseCircleOutlined } from "@ant-design/icons"
import TodoDeleteModal from "./deleteModal"
import { Spin } from "antd"

const Todo = () => {
  const [todoList, setTodoList] = useState<ITodo[]>()
  const [todo, setTodo] = useState<ITodo>()
  const [loading, setLoading] = useState<boolean>(false)
  const { setModalVisible, setModalDeleteVisible } = TodoStore()

  useEffect(() => {
    handleGetAllTodo()
  }, [])

  const handleGetAllTodo = async () => {
    try {
      setLoading(true)
      const { data } = await getAllTodo()
      if (data) {
        setTodoList(data)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleClickCard = (todo: ITodo) => {
    try {
      setTodo(todo)
      setModalVisible(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetch = () => {
    setTodo(undefined)
    handleGetAllTodo()
  }

  const handleClearModal = () => {
    setTodo(undefined)
  }

  const handleDelete = (todo: ITodo) => {
    setTodo(todo)
    setModalDeleteVisible(true)
  }

  return <>
    <Layout title="Todo List" add>

      <div className="flex flex-col items-center w-screen ">
        <div className="p-3 w-full">
          <Spin spinning={loading}>
            {todoList && todoList.map((item: ITodo) => {
              return <div key={item._id} className="bg-white w-full p-6 rounded mt-6 relative" >
                <CloseCircleOutlined className="flex flex-row-reverse text-red-600 text-2xl absolute top-1 right-1  hover:cursor-pointer" onClick={() => handleDelete(item)} />
                <div className="hover:cursor-pointer" onClick={() => handleClickCard(item)} >
                  <div className="text-4xl" >
                    {item.title}
                  </div>
                  <div className="text-xl mt-3" >
                    {item.description}
                  </div>

                </div>
                <div className="text-right">{dayjs(item.updatedAt).format('DD/MM/YYYY')}</div>
              </div>
            })}

          </Spin>

        </div>
      </div>
      <TodoModal todo={todo} handleFetch={handleFetch} handleClearModal={handleClearModal} />
      <TodoDeleteModal todo={todo} handleFetch={handleFetch} handleClearModal={handleClearModal} />
    </Layout>

  </>
}

export default Todo