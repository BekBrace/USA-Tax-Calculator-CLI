//const chalk = require('chalk');
import chalk from 'chalk';
//const inquirer = require('inquirer');
import inquirer from 'inquirer';
//const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
 


const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tax_rates (
      state TEXT,
      rate FLOAT
    )
  `);

  db.run(`
    INSERT INTO tax_rates (state, rate)
    VALUES
      ('AL', 0.04),
      ('AK', 0.00),
      ('AZ', 0.056),
      ('AR', 0.065),
      ('CA', 0.0725),
      ('CO', 0.029),
      ('CT', 0.0635),
      ('DE', 0.00),
      ('FL', 0.06),
      ('GA', 0.04),
      ('HI', 0.04),
      ('ID', 0.06),
      ('IL', 0.0625),
      ('IN', 0.07),
      ('IA', 0.06),
      ('KS', 0.065),
      ('KY', 0.06),
      ('LA', 0.0445),
      ('ME', 0.055),
      ('MD', 0.06),
      ('MA', 0.0625),
      ('MI', 0.06),
      ('MN', 0.06875),
      ('MS', 0.07),
      ('MO', 0.04225),
      ('MT', 0.00),
      ('NE', 0.055),
      ('NV', 0.0685),
      ('NH', 0.00),
      ('NJ', 0.06625),
      ('NM', 0.05125),
      ('NY', 0.04),
      ('NC', 0.0475),
      ('ND', 0.05),
      ('OH', 0.0575),
      ('OK', 0.045),
      ('OR', 0.00),
      ('PA', 0.06),
      ('RI', 0.07),
      ('SC', 0.06),
      ('SD', 0.045),
      ('TN', 0.07),
      ('TX', 0.0625),
      ('UT', 0.0595),
      ('VT', 0.06),
      ('VA', 0.043),
      ('WA', 0.065),
      ('WV', 0.06),
      ('WI', 0.05),
      ('WY', 0.04)
  `);
});

inquirer
  .prompt([
    {
      type: 'input',
      name: 'amount',
      message: 'Enter the amount of the purchase:',
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: (value) => parseFloat(value),
    },
    {
      type: 'input',
      name: 'state',
      message: 'Enter the state where the purchase was made:',
      validate: (value) => {
        const valid = /^[A-Za-z]{2}$/.test(value);
        return valid || 'Please enter a two-letter state code';
      },
      filter: (value) => value.toUpperCase(),
    },
  ])
  .then(({ amount, state }) => {
    db.get(
      `SELECT rate FROM
      tax_rates WHERE state = ?`,
      [state],
      (err, row) => {
        if (err) {
          console.error(chalk.red('An error occurred while retrieving tax rate data'));
          console.error(chalk.red(err));
          return;
        }

        if (!row) {
          console.error(chalk.red('Invalid state code'));
          return;
        }

        const rate = row.rate;
        const tax = amount * rate;
        const total = amount + tax;

        console.log(chalk.green(`Amount: $${amount.toFixed(2)}`));
        console.log(chalk.green(`Tax: $${tax.toFixed(2)} (${(rate * 100).toFixed(2)}%)`));
        console.log(chalk.green(`Total: $${total.toFixed(2)}`));
      }
    );
  })
  .catch((err) => {
    console.error(chalk.red('An error occurred while prompting for input'));
    console.error(chalk.red(err));
  });

