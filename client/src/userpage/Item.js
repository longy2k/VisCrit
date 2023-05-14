export default class Item{
    constructor(arr) {
        this.critiquerID = "";
        this.mouseOver = arr.CatLevel_Item_MouseOverText;
        this.RubricID = arr.RubricID;
        this.cat2 = arr.CatLevel02;
        this.Ld2 = this.cat2 + ": ";
        if(this.cat2 === "NULL"){
            this.Ld2 = "";
        }
        this.Display = arr.CatLevel_Item_DisplayText;
        this.LocationRt = [[],[],[],[],[]];
        this.LikertValue = "";
        this.Comment = ["", "", "", "", ""];
        this.path = arr.CatLevel01 + ": "+ this.Ld2 + arr.CatLevel_Item;
        this.Deleted = [0, 0, 0, 0, 0];

    }

    setComment(text, index){
        this.Comment[index]=text;
        this.LikertValue = index + 1;
        this.Deleted[index] = text === "" ? true : false;
    }

}