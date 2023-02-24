
export default function RubricBox(){
    function ShowHideCategory() {
        var x = document.getElementById("categoryContent");
        if (x.style.display === "none"){
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
        var buttonText=document.getElementById("Toggle");
        if (buttonText.innerText === "+"){
            buttonText.innerText="-";
        }
        else {
            buttonText.innerText="+";
        }
    }
    
    return(
        <div className="component">
            <ul className="category-items">
                <li>Available Categories</li>
                <li>Comment</li>
                <li>Location</li>
            </ul>
            <div className="categoryDiv">
            <button className="categoryButton" onClick={ShowHideCategory} id="Toggle">-</button>
            Category
            <div id="categoryContent">
                <ul className="content-list">
                    <li>
                        <div>
                            <button className="checkBox" id="Mark">_</button> 
                            Option 1
                        </div>
                    </li>
                    <li>Comment TODO</li>
                    <li>Location TODO</li>
                </ul>
            </div>
            </div>
        </div>
    )
}