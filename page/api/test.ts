import { NextApiRequest, NextApiResponse } from "next";

// Mock user data
const mockUsers = [
    { id: "123", name: "John Doe", email: "johndoe@example.com" },
    { id: "456", name: "Jane Smith", email: "janesmith@example.com" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                mode: "error",
            });
        }

        // Find user by ID
        const user = mockUsers.find((u) => u.id === userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                mode: "error",
            });
        }

        // Success response
        return res.status(200).json({
            message: "User data retrieved successfully",
            mode: "success",
            data: user,
        });
    }

    // Method not allowed
    return res.status(405).json({
        message: "Method Not Allowed",
        mode: "error",
    });
}
