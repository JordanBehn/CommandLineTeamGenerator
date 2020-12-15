const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//instantiate empy array of employ objects
const employeeList = [];
//instantiate list of employee questions
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
    //function to create new employee objects
function createNewEmployee() {
    //inquirer prompt that asks different question depending on employee role
    inquirer.prompt(employeeQuestions).then((data) => {
        if (data.role === 'Engineer') {
            inquirer.prompt([{
                type: 'input',
                name: 'github',
                message: 'What is employee github ?'
            }]).then(function(engData) {
                //creates new employee object of designated role, push it to employeeList array
                const newEngineer = new Engineer(data.name, data.id, data.email, engData.github)
                employeeList.push(newEngineer)
                inquirer.prompt({
                    type: 'list',
                    name: 'rerun',
                    choices: ['Input new employee', 'End'],
                    message: 'Would you like to add another employee?'
                }).then(function(engRerun) {
                    //run createNewEmployee again if desired
                    if (engRerun.rerun === 'Input new employee') {
                        createNewEmployee()
                    } else {
                        //run renderTeam when list is complete
                        renderTeam()
                    }
                })
            })
        }
        if (data.role === 'Intern') {
            inquirer.prompt([{
                type: 'input',
                name: 'school',
                message: 'What school does the employee attend?'
            }]).then(function(intData) {
                const newIntern = new Intern(data.name, data.id, data.email, intData.school)
                employeeList.push(newIntern)
                inquirer.prompt({
                    type: 'list',
                    name: 'rerun',
                    choices: ['Input new employee', 'End'],
                    message: 'Would you like to add another employee?'
                }).then(function(intRerun) {
                    if (intRerun.rerun === 'Input new employee') {
                        createNewEmployee()
                    } else {
                        renderTeam()
                    }
                })
            })
        }
        if (data.role === 'Manager') {
            inquirer.prompt([{
                type: 'input',
                name: 'office',
                message: 'What is employee office number?'
            }]).then(function(manData) {
                const newManager = new Manager(data.name, data.id, data.email, manData.office)
                employeeList.push(newManager)
                inquirer.prompt({
                    type: 'list',
                    name: 'rerun',
                    choices: ['Input new employee', 'End'],
                    message: 'Would you like to add another employee?'
                }).then(function(manRerun) {
                    if (manRerun.rerun === 'Input new employee') {
                        createNewEmployee()
                    } else {
                        renderTeam()
                    }
                })
            })
        }
    })
}
/*creates renderTeam function. It runs htmlRenderer on the completed employee list and 
converts it to html and writes it to a file*/
function renderTeam() {
    const employeehtml = render(employeeList)
    fs.writeFile(outputPath, employeehtml, function() {
        console.log("wrote list to file!")
    })
}

//call createNewEmployee function
createNewEmployee()