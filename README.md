# USA-Tax-Calculator-CLI
USA Tax calculator in CLI display using Node.js programming language

This is a command-line application built using Node.js that calculates the sales tax and total cost of

a purchase based on the user input of the purchase amount and the state where the purchase was made.

The application uses the SQLite database to store the tax rates for each state. When the user enters a state code, 

the application queries the database to retrieve the tax rate for that state.

The user is prompted to input the purchase amount and state code using the inquirer package. 

The input is validated to ensure that the purchase amount is a number and the state code is a valid two-letter state code.

Once the input is validated and the tax rate is retrieved from the database, the application calculates the sales tax 

and total cost of the purchase and displays the results on the command line using the chalk package for colorful output.

Overall, this application is a simple tool that can be useful for individuals or businesses that need to calculate the sales tax 

and total cost of a purchase.
