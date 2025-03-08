import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Content = (props: Props) => {
    const { children } = props
    return <main className="flex flex-1 flex-col">{children}</main>
}

export default Content
