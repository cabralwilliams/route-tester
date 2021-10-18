
const initialPrompt = `Welcome!
This program will allow you to build custom route testers.  If it works correctly, you might be able to quickly test your routes without having to use a dedicated route tester.`;

const routeQ = {
    name: "routeMethod",
    type: "list",
    message: "Enter the route method please.",
    choices: ["GET","POST"],
    default: "GET"
};

const pageNameQ = {
    name: "pageName",
    type: "input",
    message: "What is the name that you wish to give to this page?  (Required - note that the '.html' will be added automatically)",
    validate: inputName => {
        if(!inputName) {
            console.log("The page must have a name.  Please enter a name for the page.");
            return false;
        } else {
            return true;
        }
    }
};

const routeNameQ = {
    name: "routeName",
    type: "input",
    message: "What is the route url?  (Required - do not start the url with http or ./, just the remaing part of the route.)",
    validate: inputName => {
        if(!inputName) {
            console.log("There must be a route url for this action.  Please enter a url.");
            return false;
        } else {
            return true;
        }
    }
};

const paramQ = {
    name: "paramName",
    type: "input",
    message: "Please enter the name of the parameter that you wish to include.  (Required)",
    validate: inputParam => {
        if(!inputParam) {
            console.log("The parameter must have a name.  Please enter a name for the parameter.");
            return false;
        } else {
            return true;
        }
    }
};

const addQ = {
    name: "addParam",
    type: "confirm",
    message: "Do you wish to add another parameter?",
    default: false
};

const showParams = (paramArray) => {
    console.log(`The parameters that you have already input include ${paramArray.join(", ")}.`);
};

module.exports = { initialPrompt, routeQ, pageNameQ, routeNameQ, paramQ, addQ, showParams };