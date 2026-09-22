  import supabase from "../config/supabase.js"

  export const registerService = async (registerData) => {  
    const { username, email, password } = registerData;
    try {
      const { data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          },
        },
    });
    
    if (error) {
      throw new Error(error.message);
    } 

    return data;

    } catch (error) {
      throw new Error("Server Error RegisterService.", error.message);
    }
  }

  export const loginService = async (userData) => {
    const { identifier, password } = userData;

    try {
      let email = identifier;

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      if (!isEmail) {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("email, username")
          .eq("username", identifier)
          .single()

        if (userError) {
          throw new Error("User not found", userError.message)
        }

        email = user.email;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error("User not found", error.message);
      }
      
      return data;

    } catch (error) {
      throw new Error(error.message);
    } 
  }

  export const loginOAuthService = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })

      if (error) {
        throw new Error(error.message);
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select('role')
        .eq('id', data.user.id)
        .single()

      return {
        ...data,
        profile: profile.role
      }
     } catch (error) {
      throw new Error(`System Error. Please try again.`)
     }
  }

  export const tokenService = async (token) => {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  }

  export const logoutService = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
