# EifAbilities

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Steps to Run
1. Download the EiF source code from https://gitlab.com/Halyn/EiF-Public
1. Extract the source code and place it in a directory that's 2 levels up from this README (eg: if this file is in `/a/b/c/foo/bar/README.md` place `EiF-Public` in `/a/b/c/foo`)
1. Ensure you have some version of Python 3 installed
1. Run `python src/utils/lua_ability_parser.py --one-file` to generate a JSON file of all abilities found in EiF
1. Start the development server as per the below section

If the above did not work, you probably need to update Angular via `ng update @angular/core @angular/cli --allow-dirty --force` and/or to fix security vulnerabilities via `npm audit fix --force` 

## Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
