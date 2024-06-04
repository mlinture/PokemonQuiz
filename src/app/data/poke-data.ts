export class Pokedata {
    dexNum:number;
    name:string;
    imageURL_front:string;
    type:string;

    constructor(objectModel:any) {
        this.dexNum = objectModel['id'];
        this.name = objectModel['name'];
        this.imageURL_front = objectModel['sprites']['front_default'];
        this.type = objectModel.types[0].type.name;
        
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
    }
}