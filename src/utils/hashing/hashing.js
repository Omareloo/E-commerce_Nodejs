import bcrypt from "bcrypt"
export const hashing= ({plainText ,saltRound=process.env.SALT})=>{
    return bcrypt.hashSync(plainText,Number(saltRound))
}

export const compare= ({plainText ,hash})=>{
    return bcrypt.compareSync(plainText,hash)
}