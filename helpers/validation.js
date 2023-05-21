const User = require("../model/user")

exports.validateEmail = (email) =>{
    console.log("email inside --" , email)
    return String(email).toLowerCase().match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
}

exports.checkUserName = async (userName)=>{
    let unique = false
    do{
        const check = await User.findOne({userName})
        if(check){
            userName += (+new Date() * Math.random()).toString().substring(0,1)
            unique = true;
        }else{
            unique = false
        }
    }while(unique)
    return userName
}