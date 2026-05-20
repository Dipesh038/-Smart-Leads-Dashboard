import { asyncHandler } from "../utils/asyncHandler";
import { registerUser, loginUser, issueToken } from "../services/authService";
import { ApiError } from "../utils/errors";
import { User } from "../models/User";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);
  const token = issueToken(user);

  res.status(201).json({
    success: true,
    data: { user, token }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const token = issueToken(user);

  res.status(200).json({
    success: true,
    data: { user, token }
  });
});

export const me = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    }
  });
});
