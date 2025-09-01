import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      console.log('Profile query result:', { profile, error });
      
      if (error) {
        console.error('Error fetching profile:', error);
        return false;
      }
      
      const adminStatus = profile?.role === 'admin';
      console.log('Admin status:', adminStatus);
      return adminStatus;
    } catch (err) {
      console.error('Error checking admin status:', err);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', { event, session: session ? 'exists' : 'null' });
        
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          console.log('User session exists, checking admin status...');
          
          // Use a small delay to ensure the database is ready
          setTimeout(async () => {
            if (mounted) {
              const adminStatus = await checkAdminStatus(session.user.id);
              if (mounted) {
                setIsAdmin(adminStatus);
              }
            }
          }, 100);
        } else {
          console.log('No user session, setting isAdmin to false');
          setIsAdmin(false);
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        console.log('Initial session:', session ? 'exists' : 'null');
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const adminStatus = await checkAdminStatus(session.user.id);
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in getInitialSession:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('signIn called with:', { 
      email, 
      passwordLength: password.length,
      emailTrimmed: email.trim(),
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      console.log('Supabase signIn response:', {
        data: data ? {
          user: data.user ? { id: data.user.id, email: data.user.email } : null,
          session: data.session ? 'exists' : null
        } : null,
        error: error ? {
          message: error.message,
          status: error.status,
          name: error.name
        } : null
      });

      if (error) {
        console.error('SignIn error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });
      }

      return { error };
    } catch (catchError) {
      console.error('SignIn catch error:', catchError);
      return { error: catchError };
    }
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/auth`;
    
    console.log('signUp called with redirect URL:', redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    console.log('SignUp response:', { data, error });
    
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out...');
    setIsAdmin(false);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};