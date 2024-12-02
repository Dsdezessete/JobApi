import { createContext, useState, useEffect, useContext } from "react";
import { getUser, updateUser as updateUserAPI } from "../services/api/users";
import { userProps } from "../utils/types.module";
import {
  saveUserCredentials,
  getUserCredentials,
  removeUserCredentials,
} from "../services/auth";

// Define more specific types
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: userProps | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<{
    success: boolean;
    user?: userProps;
    error?: string;
  }>;
  signOut: () => void;
}

// Create the context with a more specific type
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: async () => ({ success: false }),
  signOut: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [initializing, setInitializing] = useState(true);

  // Attempt to restore user session on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const credentials = await getUserCredentials();
        
        if (credentials) {
          const { email, password } = credentials;
          
          try {
            const response = await signIn({ email, password });
            
            if (response.success && response.user) {
              console.log("Automatic login successful");
            } else {
              console.warn("Automatic login failed:", response.error);
              // Clear invalid credentials
              removeUserCredentials();
            }
          } catch (error) {
            console.error("Error during automatic login:", error);
            removeUserCredentials();
          }
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  // Sign in method with improved error handling
  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const userData = await getUser(email, password);
      
      if (userData?.data) {
        // Save credentials and update state
        saveUserCredentials(email, password);
        setAuthState({
          user: userData.data,
          isAuthenticated: true
        });

        return { 
          success: true, 
          user: userData.data 
        };
      } else {
        return {
          success: false,
          error: "Invalid credentials or user not found"
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: "An unexpected error occurred during login" 
      };
    }
  };

  // Sign out method
  const signOut = () => {
    removeUserCredentials();
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  // Show nothing while initializing
  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider 
      value={{
        ...authState,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;