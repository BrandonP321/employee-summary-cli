// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, gitName) {
        super(name, id, email);
        this.gitUserName = gitName;
    }

    getGithub() {
        return this.gitUserName;
    }

    getRole() {
        return 'Engineer'
    }
}

module.exports = Engineer