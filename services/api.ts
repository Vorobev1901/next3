export const getAllPosts = async () => {
    const response = await fetch('/api/posts')

    if (!response.ok) throw new Error('Unable to fetch posts.')

    return response.json()
}

export const getAllCountries = async () => {
    const response = await fetch('/api/countries')

    if (!response.ok) throw new Error('Unable to fetch countries.')

    return response.json()
}

export const getAllTags = async () => {
    const response = await fetch('/api/tags')

    if (!response.ok) throw new Error('Unable to fetch countries.')

    return response.json()
}

export const getCitiesByCountryId = async (url: string, { arg }: { arg: { countryId: string; query: string } }) => {
    const { countryId, query } = arg

    const response = await fetch(`${url}?countryId=${countryId}&query=${query}`, {
        method: 'GET',
        headers: {
            contentType: 'application/json',
        },
    })

    if (!response.ok) throw new Error('Unable to fetch countries.')

    return response.json()
}

export const addPost = async (post: any) => {
    const response = await fetch('https://9b586fae0da52313.mokky.dev/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...post,
            time: new Date().toLocaleDateString(),
            username: 'Морти Смит',
            tags: post.tags.map((tag: string) => {
                return { name: tag, icon: 'landmark' }
            }),
        }),
    })

    if (!response.ok) throw new Error('Unable to create post.')

    return response.json()
}

export async function uploadFiles(fileFields: FileList[]) {
    const formData = new FormData()
    const dataTransfer = new DataTransfer()

    fileFields.forEach((field) => {
        Array.from(field).forEach((file) => dataTransfer.items.add(file as File))
    })

    const files = dataTransfer.files

    Array.from(files).forEach((file) => {
        formData.append('file', file)
    })

    // const response = await fetch('https://9b586fae0da52313.mokky.dev/uploads', {
    //     method: 'POST',
    //     body: formData
    // })
    //
    // if (!response.ok) throw new Error("Unable to upload image.");
    //
    // return response.json();
}
