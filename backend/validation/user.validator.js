const zod= require("zod");

const signupBody=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const signinBody=zod.object({
    username: zod.string(),
    password: zod.string()
})

module.exports={
    signinBody,
    signupBody}



    // const zod = require("zod");
    
    // const signupBody = zod.object({
    //     username: zod.string().min(3),
    //     password: zod.string().min(6),
    //     firstName: zod.string(),
    //     lastName: zod.string()
    // });
    
    // const signinBody = zod.object({
    //     username: zod.string().min(3),
    //     password: zod.string().min(6)
    // });
    
    // module.exports = {
    //     signupBody,
    //     signinBody
    // };
    
    
    
    
