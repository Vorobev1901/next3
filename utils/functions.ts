import { ChangeEvent } from 'react'

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
    const dataTransfer = new DataTransfer()

    if (event.target.files!.length === 0) {
        return null
    }

    Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image as File))

    const files = dataTransfer.files
    const displayUrl = URL.createObjectURL(event.target.files![0])

    return { files, displayUrl }
}