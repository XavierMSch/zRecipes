export interface Recipe {
    id: number,
    name: string,
    description: string,
    bannerImg: string,
    ingredients: string[],
    steps: { stepDesc: string, stepImg: string }[],
    author: string,
    isFork: boolean,
    parentRecipe: number,
    numLikes: number,
    numSaved: number
}