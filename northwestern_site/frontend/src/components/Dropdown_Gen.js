export default class Hierarchy{
    constructor(arr = [], bool) {
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
            this.itemList.push(new Item(arr));
        } else if (this.isSub){
            this.itemList.push(new Item(arr));
        } else {
            this.subHierList.set(arr[8], new Hierarchy(arr, true));
            this.subHierNames.push(this.subHierList.get(arr[8]));
        }
        this.bText=this.name+"Tog";
    }

    getName() {
        return this.name;
    }

    addItem(arr=[]) {
        if(arr[4] == "NULL"){
            this.itemList.push(new Item(arr))
        } else if (this.subHierList.has(arr[8])){
            this.subHierList.get(arr[8]).itemList.push(new Item(arr))
        } else {
            this.subHierList.set(arr[8], new Hierarchy(arr, true))
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
            <div className="categoryDiv">
            <button className="categoryButton" onClick={this.ShowHideCategory} id={this.bText}>-</button>
            {this.name}
            <div id={this.name}>
                {this.itemsToHTML()}
                {this.subHierNames.map((item, i) => 
                <div key={i}>{item.returnHTML()}</div>)}
            </div>
            </div>
        )
    }

    itemsToHTML(){
        return (
            this.itemList.map((item, i) => 
            <ul className="content-list" key={i}>
            <li>
                <div>
                    {item.Display}                
                </div>
            </li>
            <li><button className="checkBox" id="Mark">+</button> </li>
            <li>Rating TODO</li>
        </ul>))
    }

}

class Item{
    constructor(arr) {
        this.RubicID = arr[0]
        this.Display = arr[9]
        this.LocationRt = null
        this.LikertValue = [null, null, null, null, null]
    }

}
