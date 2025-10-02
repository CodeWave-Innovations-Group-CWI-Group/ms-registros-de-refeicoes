import axios from "axios";

export default async function authMiddleware(req, res, next) {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const cleanToken = token.replace("Bearer ", "");

    try {
        const response = await axios.get("http://a367af721df9.ngrok-free.app/api/v1/auth/validate-token/", {
            headers: { Authorization: `${cleanToken}` }
        });

        const responseInfoUser = await axios.get("http://a367af721df9.ngrok-free.app/api/v1/profile/me/", {
            headers: { Authorization: `${cleanToken}` }
        });

        req.user = responseInfoUser.data;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: "Token inválido"
        });
    }

}