export interface Recipe {
    id: number,
    name: string,
    description: string,
    image_url: string,
    ingredients: { ingredient_name: string, quantity: string }[],
    steps: { step_description: string, image_url: string }[],
    owner: { id: number, username: string },
    numLikes: number,
    numSaved: number
}