import Item from "./Item";
import ItemsToHTML from "./ItemsToHTML";

export default class Hierarchy{

    constructor(arr = [], bool, index = []) {
        this.index = index;
        this.isSub = bool;
        if(this.isSub){
        this.name = arr[8];
        } else{
          this.name = arr[2];
        }
        this.itemList=[];
        this.subHierNames=[];
        this.subHierList= new Map();
        if(arr[4] == "NULL"){
            let itemLocation = [...this.index];
            itemLocation.push(this.itemList.length);
            this.itemList.push(new Item(arr, itemLocation));
        } else if (this.isSub){
            let itemLocation = [...this.index];
            itemLocation.push(this.itemList.length);
            this.itemList.push(new Item(arr, itemLocation));
        } else {
            let subIndex = [...this.index];
            subIndex.push(this.subHierNames.length);
            this.subHierList.set(arr[8], new Hierarchy(arr, true, subIndex));
            this.subHierNames.push(this.subHierList.get(arr[8]));
        }
        this.bText=this.name+"Tog";

    }


    getName() {
        return this.name;
    }

    addItem(arr=[]) {
        if(arr[4] == "NULL"){
            let itemLocation = [...this.index];
            itemLocation.push(this.itemList.length);
            this.itemList.push(new Item(arr, itemLocation))
        } else if (this.subHierList.has(arr[8])){
            let itemLocation = [...this.subHierList.get(arr[8]).index];
            itemLocation.push(this.itemList.length);
            this.subHierList.get(arr[8]).itemList.push(new Item(arr, itemLocation))
        } else {
            let subIndex = [...this.index];
            subIndex.push(this.subHierNames.length);
            this.subHierList.set(arr[8], new Hierarchy(arr, true, subIndex))
            this.subHierNames.push(this.subHierList.get(arr[8]));
        }
    }

    ShowHideCategory = () => {
        var x = document.getElementById(this.name);
        if (x.style.display === "none"){
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
        var buttonText=document.getElementById(this.bText);
        if (buttonText.innerText === "+"){
            buttonText.innerText="-";
        }
        else {
            buttonText.innerText="+";
        }
    }

    returnHTML(){
        console.log(this.subHierNames);
        return(
            <div className="category">
              <button className="categoryButton" onClick={this.ShowHideCategory} id={this.bText}>-</button>
              <strong>{this.name}</strong>
              <div id={this.name}>
                {ItemsToHTML(this.itemList)}
                {this.subHierNames.map((item, i) =>
                <div key={i}>{item.returnHTML()}</div>)}
              </div>
            </div>
        )
    }
}
