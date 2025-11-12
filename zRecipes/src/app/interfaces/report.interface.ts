export interface Report {
    id: number;
    created_at: string,
    reporter: { id: number, username: string },
    recipe: { 
        id: number, 
        name: string, 
        description: string | null, 
        image_url: string | null 
    }    
}