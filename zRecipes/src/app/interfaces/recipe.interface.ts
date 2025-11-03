export interface Recipe {
    id: number,
    name: string,
    description: string,
    image_url: string,
    ingredients: { ingredient_name: string, quantity: string }[],
    steps: { step_description: string, image_url: string }[],
    owner: { id: number, username: string },
    is_liked_by_current_user: boolean,
    numSaved: number
}
