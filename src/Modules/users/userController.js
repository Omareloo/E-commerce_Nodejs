import UserModel from "../../../DataBase/models/userModel.js";
import { compare, hashing } from "../../utils/hashing/hashing.js";
import { decrypt, encrypt } from "../../utils/encryption/encryption.js";
import { AppError } from "../../utils/CreateError.js";

// ✅ Get profile
export const getprofile = async (req, res, next) => {
  const { user } = req;
  user.phoneNumber = decrypt({
    encrypted: user.phoneNumber,
    signature: process.env.Encryption_Secret,
  });

  return res.status(200).json({ success: true, message: "Done", user });
};

// ✅ Update profile
export const updateProfile = async (req, res, next) => {
  if (req.user.phone) {
    req.user.phone = encrypt({
      plainText: req.user.phone,
      signature: process.env.ENCRYPTION_SECRET,
    });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    message: "update Profile",
    results: { user: updatedUser },
  });
};

// ✅ Change password
export const changePassword = async (req, res, next) => {
  const { oldpassword, password } = req.body;

  const compareHash = compare({
    plainText: oldpassword,
    hash: req.user.password,
  });
  if (!compareHash) {
    return next(new AppError("Old password is incorrect", 400));
  }

  const hashpassword = hashing({ plainText: password });

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { password: hashpassword, changedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
    results: { user: updatedUser },
  });
};

// ✅ Delete own account
export const deleteUser = async (req, res, next) => {
  const user = await UserModel.findByIdAndDelete(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    results: { user },
  });
};

// ✅ Delete user by admin
export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully by Admin",
    results: { user },
  });
};

// ✅ Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  const users = await UserModel.find().select("-password -__v");

  if (!users || users.length === 0) {
    return next(new AppError("No users found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    results: { users },
  });
};
