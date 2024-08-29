import jwt from "jsonwebtoken";
const isAuthicated = async (req,res,next) => {

    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authicated",
                success:false
            })
        }else{
            const decode = await jwt.verify(token,process.env.SECRET_KEY);
            if(decode){
                req.id = await decode.userId;
                next();
            }else{
                return res.status(401).json({
                    message:"Invalid ",
                    success:false
                }) 
            }
        };

      

    } catch (error) {
        console.log(error)
    }
    
};

export default isAuthicated