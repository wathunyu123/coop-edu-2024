import { NextApiRequest, NextApiResponse } from "next";

// Mock user data
const mockUsers = [
  {
    id: 1,
    memberNo: "M123456",
    name: "John Doe",
    lastname: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    idNumber: "A123456789",
    profileImage: "/path/to/profile-image1.jpg",
  },
  {
    Id: 2,
    memberNo: "M987654",
    name: "Jane Smith",
    lastname: "Smith",
    email: "janesmith@example.com",
    phoneNumber: "987-654-3210",
    idNumber: "B987654321",
    profileImage: "/path/to/profile-image2.jpg",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { memberNo } = req.query;

    if (!memberNo) {
      return res.status(400).json({ message: "Member number is required" });
    }

    const user = mockUsers.find((u) => u.memberNo === memberNo);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  }

  if (req.method === "POST") {
    const newUser = req.body;
    mockUsers.push(newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
