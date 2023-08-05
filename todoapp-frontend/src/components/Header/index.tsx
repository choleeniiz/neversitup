import { PlusOutlined,  } from '@ant-design/icons'
import { TodoStore } from '../../stores/todo.store'

interface IProps {
  title?: string
  add?: boolean
}

const Header = ({ title, add }: IProps) => {
  const { setModalVisible } = TodoStore()


  const handleCreateTodo = () => {
    setModalVisible(true)
  }


  return (
    <>
      {title && (
        <div className="w-full bg-primary h-14 items-center grid grid-cols-3 p-2 text-white">
          <div className="text-center text-white font-bold text-lg col-start-2">{title}</div>
          {add && (
            <div
              className="text-white text-md cursor-pointer flex justify-end items-center"
              onClick={handleCreateTodo}
            >
              <PlusOutlined className="mr-1" />
              <span>Create</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Header
