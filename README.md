# [![image](https://avatars2.githubusercontent.com/u/18479455?s=60&v=4)](https://cimonitor.readthedocs.io) CIMonitor

[
    ![read-the-docs](https://readthedocs.org/projects/cimonitor/badge/?version=latest)
    ![code-style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
](https://cimonitor.readthedocs.io)
[![travis-ci](https://travis-ci.org/CIMonitor/CIMonitor.svg?branch=master)](https://travis-ci.org/CIMonitor/CIMonitor)

CIMonitor is a place where all your CI statuses come together. Check if all tests have passed, and if
deployments are successful. All in one overview.

The time that deployments were scary is over, lets make them FUN!

[![dashboard example](docs/images/dashboard.gif)](https://cimonitor.readthedocs.io)

## Features

-   Server application to process and handle all your statuses
-   An easy **API** to push **custom statuses**
-   **Real-time dashboard** of your statuses (deployments, pipelines, builds, ect!)
-   **GitLab web-hook endpoint** to push all **pipeline and build statuses** with ease!
-   **Travis CI web-hook endpoint** to push all **builds** with ease!
-   Support for a **master-slave** setup to have multiple computers listening to statuses
-   Modules that push hardware to represent your status and/or events:

| Philips hue light              | Marble run                      | Traffic light                      | Power up (beacon light)           |
| ------------------------------ | ------------------------------- | ---------------------------------- | --------------------------------- |
| ![](docs/images/hue-light.gif) | ![](docs/images/marble-run.gif) | ![](docs/images/traffic-light.gif) | ![](docs/images/beacon-light.gif) |

All modules are listed in [the documentation](https://cimonitor.readthedocs.io).

## Installation & documentation

All documentation on installation and setting up can be found in the online documentation at
[cimonitor.readthedocs.io](https://cimonitor.readthedocs.io).

## Requirements

In order to run the application you need:

-   `make`
-   `yarn`
-   `node`: version 8 or higher

## Local development

To start development run:

-   `make init`: The first time you want to run the project locally
-   `make dev-server`: Run the development server
-   `make dev-server-slave`: Run the development server slave that listens to a development server
-   `make dev-client`: Run the dashboard application (restarts automatically when the front-end code changes)

Note: The server needs to run in order to display the dashboard.

## Running production

To start the production build:

-   `make build-production`: Creates all the files required for your production build

We recommend that you run the application with `pm2` so the application will restart if your computer reboots.
More on that in [the documentation](https://cimonitor.readthedocs.io).
