import { loginService, logoutService, registerService } from "../services/authService.js"

export const registerController = async (req, res) => {
  try {
    const register = await registerService(req.body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      register
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const loginController = async (req, res) => {
  try {
    const data = await loginService(req.body);
    
    res.cookie("access_token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      maxAge: 60 * 60 * 1000
    })

    res.status(200).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata.username,
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

export const logoutController = async (req, res) => {
  try {
    await logoutService();
    res.status(200).json({ message: "Logged out successfully "});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};