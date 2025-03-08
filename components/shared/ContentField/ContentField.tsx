import Image from 'next/image'
import { TImage } from '@/components/shared/PostList/PostList'

type Props = {
    title: string
    name:
        | string
        | {
              name: string | TImage
              type: string
          }[]
    type: 'text' | 'textarea' | 'file'
}

function isObject(name: any): name is TImage {
    return typeof name === 'object'
}

function isString(name: any): name is string {
    return typeof name === 'string'
}

const ContentField = (props: Props) => {
    const { title, type, name } = props
    if (isString(name)) {
        switch (type) {
            case 'text':
                return (
                    <h4 className="text-[22px]/[1.18] font-semibold">{name}</h4>
                )
            case 'textarea':
                return (
                    <div className="font-base/[1.37] text-black-900">
                        <p>{name}</p>
                    </div>
                )
            default:
                return null
        }
    } else if (isObject(name)) {
        return (
            <div className="flex flex-col gap-y-2">
                {/*<Image*/}
                {/*    className="rounded-lg object-cover object-center"*/}
                {/*    src={(name[0].name as TImage).url}*/}
                {/*    alt={title}*/}
                {/*    width={518}*/}
                {/*    height={282}*/}
                {/*    loading={'lazy'}*/}
                {/*/>*/}

                <div className="flex items-center gap-x-3">
                    <p className="text-sm text-gray-500">
                        {name[1].name as string}
                    </p>
                </div>
            </div>
        )
    }
}

export default ContentField
