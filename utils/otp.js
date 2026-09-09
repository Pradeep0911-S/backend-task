import "./env.js";
import crypto from "crypto";
import Emailsend  from "../config/configEmail.js"


const storeOTP = new Map();

export async function genOTP(email){
    const randomOTP = Math.floor(100000 + Math.random()*900000).toString();
    const referenceID = crypto.randomUUID();
    storeOTP.set(referenceID , {
        email : email,
        otp : randomOTP
    });
    await sendOTP(email,randomOTP);

    return referenceID;
}

export async function sendOTP(email ,otp) {
    return await Emailsend.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify OTP",
      text: `Verify your email to login with OTP ${otp}`,
    });
}

export async function getOTP(reference) {
    const otp = await storeOTP.get(reference);
    return otp;
}
export async function deleteREF(reference){
    return await storeOTP.delete(reference);
}
