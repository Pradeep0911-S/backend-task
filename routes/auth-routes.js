import express from "express";
import { emailValid , passFormat, passMatch } from "../utils/validation.js";
import { getUserByEmail } from "../database/db.js";
import { deleteREF, getOTP ,genOTP} from "../utils/otp.js";

const router = express.Router();


router.post('/login',async (req,res)=>{
    const {email , password } = req.body;
    if(!email){
        return res.status(400).json("Enter the email");
    }
    if(!password){
        return res.status(400).json("Enter the Password");
    }
    if(!emailValid(email)){
        return res.status(400).json({message : "Invalid Email Format"});
    }
    if(!passFormat(password)){
        return res.status(400).json({message : "Invalid Password Format"});
    }
    const user = getUserByEmail(email);
    if(!user){
        return res.status(404).json({message : "Email not found"})
    }
    const checkPass = passMatch(password , user.hash_password);
    if(!checkPass){
        return res.status(400).json("Invalid Password");
    }
    const referenceId = await genOTP(email);
    return res.status(200).json({message : "OTP sent to user email", email : user.email, referenceId: referenceId});
});

router.post('/otp/verify',async (req,res)=>{
    const {referenceId , otp } = req.body;
    if (!referenceId) {
        return res.status(400).json({message: "Reference ID is required"});
    }
    if(!otp){
        return res.status(400).json({message : "Enter OTP"});
    }
    const otpinfo = await getOTP(referenceId);
    if (!otpinfo) {
    return res.status(400).json({message: "Invalid reference ID"});
    }
    if(otp !== otpinfo.otp){
        return res.status(401).json({message : "Invalid OTP"});
    }
    await deleteREF(referenceId);
    return res.status(200).json({message : "OTP verified sucessfully"});
})

router.post('/forgot-password',async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json("Enter the email");
    }
    if(!emailValid(email)){
        return res.status(400).json({message : "Invalid Email Format"});
    }
    const user = getUserByEmail(email);
    if(!user){
        return res.status(404).json({message : "Email not found"})
    }
    const referenceId = await genOTP(email);
    return res.status(200).json({message : "OTP sent to user email", email : user.email, referenceId: referenceId});
});

export default router;