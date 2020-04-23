const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

function generateTeam() {
  inquirer.prompt([
    {
      type: "list",
      name: "chooseRole",
      message: "What type of empolyee do you wish to create?",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        // "Finished"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What is the Employee's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the Employee's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the Employee's email address?"
    },
    // {
    //     type: "confirm",
    //     name: "moreEmployees",
    //     message: "Would you like to add any more employees?"
    // }
  ]).then((data) => {
    const { chooseRole } = data
    

    switch (chooseRole) {
      case "Engineer":
        createEngineer(data)
        break;
      case "Manager":
        createManager(data)
        break;
      case "Intern":
        createIntern(data)
        break;
      // case "Finished":
      //   createFinished(data);
      //   break;
    }
  })
}

function createEngineer(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your Github",
    name: "github"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"
  }


  ]).then((data) => {

    const { name, id, email } = employeeInfo
    const { github } = data

    let newEngineer = new Engineer(name, id, email, github)
    employees.push(newEngineer)
    if (data.moreEmployees) {
      generateTeam()
    } else {
      finishedGeneratingTeam()
    }
  })
}

function createManager(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"
  }
  ]).then((data) => {

    const { name, id, email } = employeeInfo
    const { officeNumber } = data

    let newManager = new Manager(name, id, email, officeNumber)
    employees.push(newManager)
    if (data.moreEmployees) {
      generateTeam()
    } else {
      finishedGeneratingTeam()
    }
  })
}

function createIntern(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your School Name?",
    name: "school"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"

  },

  ]).then((data) => {
    // console.log(data)

    const { name, id, email } = employeeInfo
    const { school } = data

    let newIntern = new Intern(name, id, email, school)
    employees.push(newIntern)
    if (data.moreEmployees) {
      generateTeam()
    } else {
      finishedGeneratingTeam()
    }
  })
}

function finishedGeneratingTeam() {

  fs.writeFile(outputPath, render(employees), (err, data) => {
    if (err) throw err;

    console.log("The File Was Successfully Created in The Output Folder")
  })
}

generateTeam()