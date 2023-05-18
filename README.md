# VisCrit

Team Members: Long Huynh, Jeffrey Deng, Thamany Valbrune, and Christos Kakouros
## Table of Contents

**[1. Overview ](#heading--1)**

**[2. Getting Started ](#heading--2)**
  * [2.1. Installation ](#heading--2)
  * [1.2. Example Input ](#heading--1-2)

**[3. Using VisCrit ](#heading--3)**


## Overview: <a name="heading--1"/>

VisCrit is a web-based application that focuses on critiquing the appearance of someone's data visualization according to a rubric. Users are able to upload a PDF, along with an excel sheet, which would be the rubric. Students are able to export their results and our client will be able to access these results. The application was created with ReactJS and ExpressJS.

## Installation <a name="heading--2"/>

* Download the GitHub repository

* Run the client code by running:

  * "cd client"

  * "npm install"

  * "npm start" 

* Run the server code in another terminal by running:

  * "cd server"

  * "npm install"

  * "npm start"

## Example Files Used <a name="heading--1-2"/>
PDF:
![image width="30"](https://github.com/longy2k/VisCrit/assets/90154619/95ff538a-9a00-4129-976c-40d7c485650b)

Rubric:
![image width="30"](https://github.com/longy2k/VisCrit/assets/90154619/b5b66cd5-5ded-4e98-af40-70abe2689b71)

| Header | Description |
| --- | --- |
| RubricID | Given ID for listed category |
| RubricListingOrder | The order of the categories |
| CatLevel01 | Overall a single category |
| CatLevel02  | A nested category |
| CatLevel_Item | An item within the category, this is where you can add some subject you want someone to critique at, such as "Clarity" |
| CatLevel01_DisplayText | A category's name display |
| CatLevel02_DisplayText | A nested category's name display |
| CatLevel_Item_DisplayText | CatLevel_Item's displayed on the site |
| CatLevel01_MouseOverText | Hover over a category (CatLevel01), this text will display as a tooltip |
| CatLevel02_MouseOverText | Hover over a category (CatLevel02), this text will display as a tooltip |

**These header names are needed.**

## After the files are uploaded, this is what you should see:
![image width="30"](https://github.com/longy2k/VisCrit/assets/90154619/758931af-ee00-449f-983f-06153fbe360c)

### Using the Application <a name="heading--3"/> 

* User should first choose their critiquerID.

* User is able to open a category and add a rating to something in the list by pressing the + button. 

* Choose rating and location. The location is where you can highlight the page to specify where you are rating. 

* Enter a comment and press submit. 
  * The comment can be deleted by *pressing the + again, choosing the rating number you want to delete, then press the delete button.* 

* The rating number should be there, when hovered it should show the location you annotated.

* After user is done filling out everything, they can export their work, and the client will be able to access their exported results. 



--------
