
const inquirer = require('inquirer');
const fs = require('fs');
const { initialPrompt, routeQ, pageNameQ, routeNameQ, paramQ, addQ, showParams } = require('./src/questioner');
const { pageRender } = require('./src/makeHTML');

const runProgram = (pageData) => {
    if(!pageData) {
        pageData = {
            metaData: {},
            paramData: []
        };
    }
    if(pageData.paramData.length === 0) {
        console.log(initialPrompt);
        inquirer.prompt(
            [
                pageNameQ, routeQ, routeNameQ, paramQ, addQ
            ]
        )
        .then(qResponses => {
            pageData.metaData.routeMethod = qResponses.routeMethod;
            pageData.metaData.routeName = qResponses.routeName;
            pageData.metaData.pageName = qResponses.pageName;
            pageData.paramData.push(qResponses.paramName);
            if(qResponses.addParam) {
                runProgram(pageData);
            } else {
                console.log(pageData);
            }
        });
    } else {
        showParams(pageData.paramData);
        inquirer.prompt(
            [
                paramQ, addQ
            ]
        )
        .then(qResponses => {
            pageData.paramData.push(qResponses.paramName);
            if(qResponses.addParam) {
                runProgram(pageData);
            } else {
                console.log(pageData);
                const pageFile = pageRender(pageData);
                fs.writeFile(`./routeFiles/${pageData.metaData.pageName}.html`, pageFile, err => {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        });
    }
};

runProgram();