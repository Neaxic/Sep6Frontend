const promptDirectory = require('inquirer-directory')

module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory)

    plop.setGenerator('New component', {
        description: 'Generates a React component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name your component:',
            },
            {
                type: 'directory',
                name: 'directory',
                message: 'Choose parent directory',
                basePath: './src',
            },
        ],
        actions() {
            const actions = []
            const templatePath = './misc/react-component'
            const componentPath = 'src/{{directory}}'

            actions.push({
                type: 'add',
                path: `${componentPath}/{{properCase name}}.tsx`,
                templateFile: `${templatePath}/component.hbs`,
            })

            return actions
        },
    })
};