export default class Item{
    constructor(arr, itemLoc=[]) {
        this.itemLocation = itemLoc;
        this.RubicID = arr[0]
        this.cat2 = arr[4]
        this.Ld2 = this.cat2 + ": ";
        if(this.cat2 === "NULL"){
            this.Ld2 = ""
        }
        this.Display = arr[9]
        this.LocationRt = null
        this.LikertValue = ["", "", "", "", ""]
        this.path = arr[2] + ": "+ this.Ld2 + arr[6]
    }

    setComment(text){
        this.LikertValue[0]=text;
    }
}
