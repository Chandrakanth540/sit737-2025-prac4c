const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Function to validate inputs
const validateInput = (num1, num2, operation) => {
    if (num1 === undefined || isNaN(num1)) {
        logger.error('Invalid input: num1 is missing or not a number');
        return { error: 'Invalid input: num1 must be a valid number.' };
    }

    if (operation !== 'sqrt' && (num2 === undefined || isNaN(num2))) {
        logger.error('Invalid input: num2 is missing or not a number');
        return { error: 'Invalid input: num2 must be a valid number.' };
    }

    num1 = parseFloat(num1);
    num2 = num2 !== undefined ? parseFloat(num2) : null;

    if (operation === 'sqrt' && num1 < 0) {
        logger.error('Invalid input: Square root of a negative number is not allowed');
        return { error: 'Invalid input: Cannot calculate square root of a negative number.' };
    }

    if ((operation === 'divide' || operation === 'mod') && num2 === 0) {
        logger.error(`Math error: Cannot ${operation} by zero`);
        return { error: `Math error: Cannot ${operation} by zero.` };
    }

    return { num1, num2 };
};

// Arithmetic operation endpoints
app.get('/add', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'add');
    if (error) return res.status(400).json({ error });

    const result = num1 + num2;
    logger.info(`Addition: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'subtract');
    if (error) return res.status(400).json({ error });

    const result = num1 - num2;
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/multiply', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'multiply');
    if (error) return res.status(400).json({ error });

    const result = num1 * num2;
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'divide');
    if (error) return res.status(400).json({ error });

    const result = num1 / num2;
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ result });
});

app.get('/power', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'power');
    if (error) return res.status(400).json({ error });

    const result = Math.pow(num1, num2);
    logger.info(`Exponentiation: ${num1} ^ ${num2} = ${result}`);
    res.json({ result });
});

app.get('/sqrt', (req, res) => {
    const { num1, error } = validateInput(req.query.num1, null, 'sqrt');
    if (error) return res.status(400).json({ error });

    const result = Math.sqrt(num1);
    logger.info(`Square Root: sqrt(${num1}) = ${result}`);
    res.json({ result });
});

app.get('/mod', (req, res) => {
    const { num1, num2, error } = validateInput(req.query.num1, req.query.num2, 'mod');
    if (error) return res.status(400).json({ error });

    const result = num1 % num2;
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
    res.json({ result });
});

// Start server
app.listen(port, () => {
    logger.info(`Calculator microservice running on http://localhost:${port}`);
});
