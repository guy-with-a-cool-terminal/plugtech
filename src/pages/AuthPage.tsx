import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isNewPasswordMode, setIsNewPasswordMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check for password reset tokens in URL
  useEffect(() => {
    const checkForResetToken = () => {
      // Check both hash and search params for reset tokens
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const searchParams = new URLSearchParams(location.search);
      
      let accessToken = hashParams.get('access_token') || searchParams.get('access_token');
      let refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
      let type = hashParams.get('type') || searchParams.get('type');
      
      console.log('Checking for reset tokens:', { accessToken, refreshToken, type });
      
      if (accessToken && type === 'recovery') {
        console.log('Recovery token found, setting session...');
        
        // Set the session with the tokens from the URL
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        }).then(({ data, error }) => {
          if (error) {
            console.error('Error setting session:', error);
            toast({
              title: "Error",
              description: "Invalid or expired reset link. Please request a new password reset.",
              variant: "destructive",
            });
          } else {
            console.log('Session set successfully');
            setIsNewPasswordMode(true);
            setIsResetMode(false);
            setIsLogin(false);
            toast({
              title: "Password Reset",
              description: "Please enter your new password below.",
            });
            
            // Clean up the URL
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
        });
      }
    };

    checkForResetToken();
  }, [location, toast]);

  // Redirect if already authenticated and not in password reset mode
  useEffect(() => {
    if (user && !isNewPasswordMode) {
      navigate('/');
    }
  }, [user, isNewPasswordMode, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetMode) {
        // Handle password reset request
        const resetUrl = `${window.location.origin}/auth`;
        console.log('Sending reset email with redirect to:', resetUrl);
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: resetUrl
        });
        
        if (error) {
          console.error('Reset password error:', error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Reset Email Sent",
            description: "Check your email for password reset instructions. The link will bring you back here to set a new password.",
          });
          setIsResetMode(false);
          setEmail('');
        }
      } else if (isNewPasswordMode) {
        // Handle new password setting
        if (newPassword !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match.",
            variant: "destructive",
          });
          return;
        }

        if (newPassword.length < 6) {
          toast({
            title: "Error",
            description: "Password must be at least 6 characters long.",
            variant: "destructive",
          });
          return;
        }

        console.log('Updating password...');
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) {
          console.error('Password update error:', error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          console.log('Password updated successfully');
          toast({
            title: "Password Updated",
            description: "Your password has been successfully updated. You can now sign in with your new password.",
          });
          
          // Reset form and redirect to normal login
          setIsNewPasswordMode(false);
          setNewPassword('');
          setConfirmPassword('');
          setIsLogin(true);
          
          // Sign out to clear the recovery session
          await supabase.auth.signOut();
          
          toast({
            title: "Please Sign In",
            description: "Please sign in with your email and new password.",
          });
        }
      } else {
        // Handle normal login/signup
        const { error } = isLogin 
          ? await signIn(email, password)
          : await signUp(email, password);

        if (error) {
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          if (isLogin) {
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
            navigate('/');
          } else {
            toast({
              title: "Account created!",
              description: "Please check your email to verify your account.",
            });
          }
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsResetMode(false);
    setIsNewPasswordMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isNewPasswordMode ? 'Set New Password' : 
                 isResetMode ? 'Reset Password' : 
                 isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isNewPasswordMode ? 'Enter your new password below' :
                 isResetMode ? 'Enter your email to receive reset instructions' :
                 isLogin ? 'Sign in to your account to continue' : 'Create a new account to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isNewPasswordMode ? (
                // New password form
                <>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        disabled={loading}
                        minLength={6}
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={loading}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        disabled={loading}
                        minLength={6}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                </>
              ) : (
                // Email field (for all other modes)
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    disabled={loading}
                    placeholder="Enter your email address"
                  />
                </div>
              )}

              {!isResetMode && !isNewPasswordMode && (
                // Password field (for login/signup)
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      disabled={loading}
                      minLength={6}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isNewPasswordMode ? <Eye className="w-4 h-4" /> :
                     isResetMode ? <Mail className="w-4 h-4" /> :
                     isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {isNewPasswordMode ? 'Update Password' :
                     isResetMode ? 'Send Reset Email' :
                     isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>

            {!isNewPasswordMode && (
              <div className="mt-6 text-center space-y-2">
                {!isResetMode && (
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary/80 text-sm block w-full"
                    disabled={loading}
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </button>
                )}
                
                {isLogin && !isResetMode && (
                  <button
                    onClick={() => setIsResetMode(true)}
                    className="text-muted-foreground hover:text-foreground text-sm"
                    disabled={loading}
                  >
                    Forgot your password?
                  </button>
                )}
                
                {isResetMode && (
                  <button
                    onClick={() => {
                      setIsResetMode(false);
                      setEmail('');
                    }}
                    className="text-muted-foreground hover:text-foreground text-sm"
                    disabled={loading}
                  >
                    Back to sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;