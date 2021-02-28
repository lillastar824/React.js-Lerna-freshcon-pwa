## Freshconn Application
Freshconn Application

## Table of Contents:

| S.No |                              Topic                              |                                                                        Description |
| :--- | :-------------------------------------------------------------: | ---------------------------------------------------------------------------------: |
| 1    |               [Getting Started](#getting-started)               |                                            This topic covers the high level basics |
| 2    |                 [Tech Stack](#tech-stack-used)                  |                                                    Tech stack used in this project |
| 3    |        [Architecture](#architectural-diagram-high-level)        |                     This topic covers the high level requirements and architecture |
| 4    |                      [Features](#features)                      |                                                      Features for this project/app |
| 5    |          [Installation & Setup](#installation--setup)           |                     This topic explains the installation and setup steps in detail |
| 6    |             [Project Structure](#project-structure)             |                                   Explains the flow of the project on a high level |
| 7    |            [Project Management](#project-management)            |                                                 Project management tools and repos |
| 8    |                        [Testing](#tests)                        |                                       Explaines the testing strategy involved here |
| 9    |                          [Lint](#lint)                          |                                                           Lint rules if applicable |
| 10   |         [Bugs and Improvements](#bugs-or-improvements)          |                                                         Open bugs and improvements |
| 11   |                 [Contributions](#contributions)                 |                                              Guidelines to contribute to this repo |
| 12   |                       [Roadmap](#roadmap)                       |                                 Provide update on the roadmap for this project/app |
| 13   | [Development Error Logs](#development-error-logs-for-reference) |            This topic listdown the eror logs captured during the development phase |
| 14   |                       [License](#license)                       |                                   This topic covers the licensing part of the repo |
| 15   |                       [Support](#support)                       |                                                      How to get help for this repo |
| 16   |              [Acknowledgements](#acknowledgements)              | This section will list the acknowledgements and people who helped me to build this |

## Getting started


## Tech Stack Used

JS library : ReactJS
Hosting: Firebase
Docker: Applicable

## Software Requirements/Architecture



### Architectural Diagram high level

N/A

## Features for the Application.


## Installation & Setup


# freshconn-meta

This is meta for user, farmer, driver sources and firebase rules, firestore-indexes, security, storage

# Firebase Note
add private key json from firebase admin to env `GOOGLE_APPLICATION_CREDENTAILS` in your shell 

# Packages

	greenery - core package for common components
	shop - main website targeting consumers
	driver - for drivers in deliverying the items
	farmer - to help farmers in managing products sold in markets
	landing - landing page of freshconn

# Usage

### Prepare

```npm i```

```npm run bootsrap```

### Build

To build all the websites/packages

```npm run build```

for specific websites/package

```npm run build:<package>```

### Deploy

This will deploy all rules, indexes, functions and built websites

```npm run deploy```

# Development

Please avoid reaching firebase servers (no ```npm run start```)

develop components with storybook in test-driven way 

#### Mock API setup


## Project Structure

Shop
Driver
Farmer
Functions
Greenery

## Project Management

- User Stories Board: https://github.com/freshconn/freshconn-pwa/projects/1

## Tests

### Running Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.

### Creating new tests

If you need to add more test cases to the project just create a new file in `/test/` and run the command.

## Lint

### Running Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.

## Contributions

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## Roadmap

## Development Error Logs for Reference

## Bugs or improvements

## License

This is owned by Foxolabs Inc

## Support

- Foxolabs contact : Saranraj Santhanam- Tech Owner
- Foxolabs contact : Sanjeev - Tech Lead
- Foxolabs contact : Deepan  - Full Stack Developer
- Foxolabs contact : Karthik - Full Stack Developer

## Acknowledgements

To the tech community for building open source projects


