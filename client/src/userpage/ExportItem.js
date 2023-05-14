export default class ExportItem{
    constructor(item, index = -1) {
        this.UserID = item.critiquerID;
        this.RubricID = item.RubricID;
        this.LocationRect = item.LocationRt[index][1].length>0 ? item.LocationRt[index][1] : "NULL";
        this.LikertValue = index+1;
        this.TextInput = item.Comment[index];
        this.Deleted = item.Deleted[index];
    }

    setComment(text, index){
        this.Comment[index]=text;
        this.LikertValue = index + 1;
        this.Deleted[index] = text === "" ? 1 : 0;
    }

}