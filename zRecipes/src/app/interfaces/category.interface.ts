export interface Category {
    id: number,
    name: string,
    image: string | null,
    recipes: {
        id: number,
        name: string,
        description: string | null,
        image_url: string | null
    }[]
}