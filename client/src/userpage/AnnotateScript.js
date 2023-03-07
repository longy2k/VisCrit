import { Annotorious } from "@recogito/annotorious";
import SelectorPack from "@recogito/annotorious-selector-pack";
import "@recogito/annotorious/dist/annotorious.min.css";
import Rectangle from "../assets/images/rectangle_icon.png";
import Circle from "../assets/images/circle_icon.png";
import Dot from "../assets/images/dot_icon.png";
import ExampleDashboard from "../assets/images/dashboard.png";

export function AnnotateScript() {

let anno = null;

  return (
    <div className="annotateScript">

    {/* The "menu" of the types of annotations, sits above given image */}
    
      <div id="my-toolbar-container">
        <button onClick={() => anno.setDrawingTool("circle")}>
          <img width={30} src= {Circle} alt="circle" />
        </button>
        <button onClick={() => anno.setDrawingTool("point")}>
          <img width={30} src={Dot} alt="point" />
        </button>
        <button onClick={() => anno.setDrawingTool("rect")}>
          <img width={30} src={Rectangle} alt="Rectangle" />
        </button>
      </div>
      
      <img
      width="960vw"
        ref={(node) => {
          anno = new Annotorious({
            image: node
          });

          SelectorPack(anno);
          console.log(anno.listDrawingTools());
          anno.setDrawingTool("freehand");

        /**
         * 
         *   this part eventually will connect with backend
         * 
         **/

          anno.on("createAnnotation", function (annotation) {
            debugger;
            console.log(JSON.stringify(annotation));
          });
        }}
        src= {ExampleDashboard}
        alt="dashboard"
      />
    </div>
  );
}