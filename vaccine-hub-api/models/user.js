const { BadRequestError, UnauthorizedError } = require("../utils/error");
const { BCRYPT_WORK_FACTOR } = require('../config.js');
const bcrypt = require("bcrypt");
const db = require("../db");


class User {
    
    static async makePublicUser(user){
        return{
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            date: user.date
        }
    }

    static async login(credentials) {
        const registerFields = ["password", "email"];

        registerFields.forEach((element) => {
            if(!credentials.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`);
            }
        });

        const user = await User.fetchUserByEmail(credentials.email);

        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid){
                return User.makePublicUser(user);
            }
        }
        throw new UnauthorizedError("Wrong Password");

    }

    static async register(credentials){
        const registerFields = ["password", "first_name", "last_name", "email", "location"];

        registerFields.forEach((element) => {
            if(!credentials.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`);
            }
        });

        const existingUser = await User.fetchUserByEmail(credentials.email);
        if(existingUser){
            throw new BadRequestError(`Email already exists`);
        }

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid Email");
        }

        
        const lowercaseEmail = credentials.email.toLowerCase();
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            
            `INSERT INTO users(
                password,
                first_name,
                last_name,
                email,
                location
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, password, first_name, last_name, email, location, date;
            `, 
                [hashedPassword, credentials.first_name, credentials.last_name, lowercaseEmail, credentials.location]
        )

        const user = result.rows[0];
        return User.makePublicUser(user);

    }

    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("Need Valid Email");
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];
        return user;
    }
}

module.exports = User;