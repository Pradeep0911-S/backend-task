env varaiables 

PORT=port-number

EMAIL_USER=your-gmail


EMAIL_PASS=your-app-password-gmail

EMAIL_FROM=your-gmail

END POINTS

all request are to the POST method

http://localhost:3000/api/auth/login


{
    "email" : "demo01110911@gmail.com",
    "password" : "Demotest@123"
}


http://localhost:3000/api/auth/otp/verify 


{
  "referenceId": "a22b6932-3e25-4983-b9c3-00018208e6af",
  "otp": "329830"
}


http://localhost:3000/api/auth/forgot-password 



{
  "email" :"demo01110911@gmail.com"
}  


