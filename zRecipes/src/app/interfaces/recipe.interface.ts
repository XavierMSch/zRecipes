export interface Recipe {
    id: number,
    name: string,
    description: string,
    img_url: string,
    ingredients: { name: string, quantity: string }[],
    steps: { stepDesc: string, stepImg: string }[],
    author: string,
    numLikes: number,
    numSaved: number
}