const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeList = [];
const employeeQuestions = [{
    type: 'input',
    name: 'name',
    message: 'What is employee name?',
}, {
    type: 'input',
    name: 'id',
    message: 'What is employee id?',
}, {
    type: 'list',
    name: 'role',
    message: 'What is employee role?',
    choices: ['Engineer', 'Intern', 'Manager']
}, {
    type: 'input',
    name: 'email',
    message: 'What is employee email?',
}]
inquirer.prompt(employeeQuestions).then((data) => {
        if (data.role === 'Engineer') {
            inquirer.prompt([{
                type: 'input',
                name: 'github',
                message: 'What is employee github ?'
            }]).then(function(engData) {
                const newEngineer = new Engineer(data.name, data.id, data.email, engData.github)
                employeeList.push(newEngineer)
                inquirer.prompt({
                    type: 'list',
                    name: 'rerun',
                    choices: ['Input new employee', 'End'],
                    message: 'Would you like to add another employee?'
                }).then(function(engRerun) {
                    if (engRerun.rerun === 'Input new employee') {
                        start()
                    } else {
                        createTeam()
                    }
                })
            })
        }

        if (data.role === 'Intern') {

        }

        if (data.role === 'Manager') {

        }
    })
    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
htmlRenderer()
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