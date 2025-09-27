export interface recipe {
    id: number,
    name: string,
    description: string,
    bannerImg: string,
    ingredients: string[],
    steps: { stepDesc: string, stepImg: string }[],
    author: string,
    isFork: boolean,
    parentRecipe: number, // id de la receta padre
    numLikes: number,
    numSaved: number
}