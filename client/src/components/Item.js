export default class Item{
    constructor(arr) {
        this.RubicID = arr[0]
        this.Ld2 = arr[4] + ": ";
        if(arr[4] === "NULL"){
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