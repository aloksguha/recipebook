import { Ingredients } from "../shared/ingredients.modal";

export class Recipe {
    public name: string; 
    public description: string;
    public imagePath: string;
    public ingrediants : Ingredients[];
    
    constructor(name:string, desc:string, imgpath:string, ingrediants: Ingredients[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imgpath;
        this.ingrediants = ingrediants;
    }
}