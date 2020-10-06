const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArr = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function addManager() {
    const managerInput = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the manager's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the manager's ID?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the manager's email?",
            name: 'email'
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: 'officeNumber'
        }
    ]).then(function(response) {
        const {name, id, email, officeNumber} = response
        const newManager = new Manager(name, id, email, officeNumber)
        employeesArr.push(newManager)
    })
}

async function addEngineer() {
    const engineerInput = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the engineer's ID?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email'
        },
        {
            type: "input",
            message: "What is the engineer's Github username?",
            name: 'gitUserName'
        }
    ]).then(function(response) {
        const {name, id, email, gitUserName} = response
        const newEnginner = new Engineer(name, id, email, gitUserName)
        employeesArr.push(newEnginner)
    })
}

async function addIntern() {
    const internInput = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the intern's ID?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email'
        },
        {
            type: "input",
            message: "Where is the intern going to school?",
            name: 'school'
        }
    ]).then(function(response) {
        const {name, id, email, school} = response
        const newIntern = new Intern(name, id, email, school)
        employeesArr.push(newIntern)
    })
}

// primary function to get input for type of employee
async function getUserInput() {
    let memberToAdd;

    // prompt user for type of employee to be added
    const userInput = await inquirer.prompt([
        {
            type: 'list',
            message: 'What type of team member would you like to add?',
            choices: ['manager', 'engineer', 'intern'],
            name: 'memberType'
        }
    ]).then(function (response) {
        // asign the type of member to add to a variable
        memberToAdd = response.memberType
    })

    // call the appropriate function to create an employee based on user's input
    switch (memberToAdd) {
        case 'manager':
            const managerAdd = await addManager()
            break
        case 'engineer':
            const engineerAdd = await addEngineer()
            break
        case 'intern':
            const internAdd = await addIntern()
            break
    }

    // prompt user for adding any more employees
    const addMoreInput = await inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add another team member?',
            choices: ['YES', 'NO'],
            name: 'addMore'
        }
    ]).then(function(response) {
        // if 'yes', recursively call current function to run again
        if (response.addMore === 'YES') {
            getUserInput()
        } else {
            // if 'no', render the current employees and create and html file
            fs.writeFile(outputPath, render(employeesArr), function(err) {
                // throw and error if it occurs
                if (err) {
                    throw err
                }
                // if no error occurs, let user know the html file has been created
                console.log('HTML file with employees has been created!')
            })
        }
    })
}

getUserInput()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
