import { Modal } from "antd"
import { TodoStore } from "../../stores/todo.store"
import { ITodo  } from "../../interfaces/todo.interface"
import { deleteTodo } from "../../actions/todo"



interface IProps {
    todo?: ITodo
    handleFetch: () => void
    handleClearModal: () => void
}

const TodoDeleteModal = (props: IProps) => {
    const { todo, handleFetch, handleClearModal } = props
    const { modalDeleteVisible, setModalDeleteVisible } = TodoStore()

    const onDelete = async () => {
        try {
            if (todo) {
                const { data } = await deleteTodo(todo._id)
                if (data) {
                    setModalDeleteVisible(false)
                    handleFetch()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCancel = () => {
        setModalDeleteVisible(false)
        handleClearModal()
    }

    return <Modal
        open={modalDeleteVisible}
        onCancel={onCancel}
        onOk={onDelete}
    >
        <div className="text-2xl">Want Delete {todo?.title} ?</div>
    </Modal>
}

export default TodoDeleteModal

