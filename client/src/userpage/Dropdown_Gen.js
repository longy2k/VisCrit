import Item from "./Item";
import ItemsToHTML from "./ItemsToHTML";

export default class Hierarchy{
    /* Contructs a Hierarchy with item, boolean for whether this is a sub Hierarchy, and index location of current Hierarchy in Data_Extract */
    constructor(arr = [], bool) {
        this.isSub = bool;
        /* Checks if is subHierarchy before assigning correct Hierarchy name */
        if(this.isSub){
        this.name = arr.CatLevel02_DisplayText;
        this.mouseOver = arr.CatLevel02_MouseOverText;
        } else{
            this.mouseOver = arr.CatLevel01_MouseOverText;
            this.name = arr.CatLevel01;
        }
        /* ItemList is where all the items in the current Hierarchy is stored */
        this.itemList=[];
        /* subHierNames is the list of names of sub Hierarchys in current Hierarchy, used to find sub Hierarchy object in subHierList */
        this.subHierNames=[];
        /* Hashmap storing sub Hierarchies */
        this.subHierList= new Map();
        /* Checks if there is subHierarchy, if not, adds to Item list. If there is, create new sub Hierarchy and add item to sub Hierarchy ItemList*/
        if(arr.CatLevel02 == "NULL"){
            this.itemList.push(new Item(arr));
        } else if (this.isSub){
            this.itemList.push(new Item(arr));
        } else {
            this.subHierList.set(arr.CatLevel02_DisplayText, new Hierarchy(arr, true));
            this.subHierNames.push(this.subHierList.get(arr.CatLevel02_DisplayText));
        }
        this.bText=this.name+"Tog";

    }

    getName() {
        return this.name;
    }
    /* Adds item to correct Hierarchy, essentially the same as the add Item in constructor */
    addItem(arr=[]) {
        if(arr.CatLevel02 == "NULL"){
            this.itemList.push(new Item(arr))
        } else if (this.subHierList.has(arr.CatLevel02_DisplayText)){
            this.subHierList.get(arr.CatLevel02_DisplayText).itemList.push(new Item(arr))
        } else {
            this.subHierList.set(arr.CatLevel02_DisplayText, new Hierarchy(arr, true))
            this.subHierNames.push(this.subHierList.get(arr.CatLevel02_DisplayText));
        }
    }

    /* onClick handler to show/Hide items */    
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

    returnHTML() {
        return (
          <div className="category">
            <button className="categoryButton" onClick={this.ShowHideCategory} id={this.bText}>+</button>
            <div className="tooltip">
              <span className="categoryHover">{this.mouseOver}</span>
              <h4>{this.name}</h4>
            </div>
            <div id={`${this.name}`} style={{ display: "none" }}>
              {ItemsToHTML(this.itemList)}
              {this.subHierNames.map((item, i) => (
                <div key={i}>{item.returnHTML()}</div>
              ))}
            </div>
          </div>
        );
      }
}
