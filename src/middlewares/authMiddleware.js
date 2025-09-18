import axios from "axios";

export default async function authMiddleware(req, res, next) {

    const token = req.header('Authorization')?.replace('Bearer', '').trim();

    if (!token) {
        return res.status(401).json({
            error: "Token não fornecido"
        });
    }

    try {
        const response = await axios.get("https://ad64f6d6ca53.ngrok-free.app/api/v1/auth/register/", {
            headers: { Authorization: `Bearer ${token}` }
        });

        req.user = response.data;

        next();

    } catch (error) {
        res.status(401).json({
            error: "Token inválido"
        });
    }

}