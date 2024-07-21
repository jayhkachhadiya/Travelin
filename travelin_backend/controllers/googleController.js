const { CLIENT_ID, CLIENT_SECRATE } = process.env;
// const { OAuth2Client } = require('google-auth-library')
import express from 'express';
import { google } from 'googleapis';
import axios from 'axios';



const redirectUrl = 'http://localhost:3000/oauth'
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

class googleController {
    // static postDetail = async (req, res) => {
    //     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //     res.header('Referrer-Polisy', 'no-refferrer-downgrade')

    //     const OAuth2Client = new OAuth2Client(
    //         process.env.CLIENT_ID,
    //         process.env.CLIENT_SECRATE,
    //         redirectUrl
    //     )

    //     const authorizeUrl = OAuth2Client.generateAuthUrl({
    //         access_type: 'offline',
    //         scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    //         prompt: 'consent'
    //     })

    //     res.json({ url:authorizeUrl })
    // }


    // app.get('/auth/google', (req, res) => {

    static getDetail = async (req, res) => {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRATE,
            REDIRECT_URI
        );
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.profile']
        });
        res.redirect(authUrl);
    }


    //     app.get('/auth/google/callback', async (req, res) => {

    // });


    static getData = async (req, res) => {
        const { code } = req.query;

        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRATE,
            REDIRECT_URI
        );

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        });

        // Handle user data
        console.log(data);
 
        res.send('Successfully authenticated');
    }
}

export default googleController