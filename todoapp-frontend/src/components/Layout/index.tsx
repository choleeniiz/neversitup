import { ReactNode } from 'react'
import Header from '../Header'
// import Header from '../Header'

interface IProps {
  children: ReactNode
  title?: string
  add?: boolean
}

const Layout = ({ children, title, add}: IProps) => {
  return (
    <>
      <Header
        title={title}
        add={add}
      />
      <div className="flex justify-center">
        <div className="wrapper-container">{children}</div>
      </div>
    </>
  )
}

export default Layout
