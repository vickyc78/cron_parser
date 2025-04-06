# Cron Parser

A simple TypeScript application that parses cron strings and expands each field to display the times at which it will run.

# Install Dependencies

Install the required packages using npm:

# bash

# npm install

# Running the Application

To run the cron parser, you can use the following command:

# bash

# npx ts-node index.ts "<cron-string>"

# Example

For example, to parse the cron string _/15 0 1,15 _ 1-5 /usr/bin/find, use the command:

# bash

# npx ts-node index.ts "_/15 0 1,15 _ 1-5 /usr/bin/find"

This command will output the expanded times for each cron field.

# Testing

# Install Jest and TypeScript Definitions

If you haven't done so already, make sure you have Jest set up in your development environment. It should already be included in the package.json, but if you need to manually add it:

# bash

# npm install --save-dev jest ts-jest @types/jest

# Run the Test Suite

You can run the tests using:

# bash

# npx jest

If all tests pass, the setup is successful, and the cron parser works correctly.
"# cron_parser" 
