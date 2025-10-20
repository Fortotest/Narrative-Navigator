'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot } from 'lucide-react';
import { auth } from '@/lib/firebase/client';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.301-11.303-7.803l-6.573,4.817C9.656,39.663,16.318,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const loginHeroImage = PlaceHolderImages.find((img) => img.id === 'login-hero');


  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
      toast({
        title: 'Login Successful',
        description: 'Welcome to Narrative Navigator!',
      });
    } catch (error) {
      console.error('Error signing in with Google', error);
      toast({
        title: 'Login Failed',
        description: 'There was an error signing in. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return null;
  }
  
  if (user) {
    router.push('/');
    return null;
  }


  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
         {loginHeroImage && (
            <Image
              src={loginHeroImage.imageUrl}
              alt={loginHeroImage.description}
              data-ai-hint={loginHeroImage.imageHint}
              fill
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Bot className="mr-2 h-6 w-6" />
          Narrative Navigator
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This tool has revolutionized my crypto research workflow, helping me discover trends I would have otherwise missed.&rdquo;
            </p>
            <footer className="text-sm">Fictional User</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex min-h-screen items-center justify-center py-12 lg:min-h-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>
          <Button onClick={handleSignIn} variant="default" className="w-full" size="lg">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Welcome to Narrative Navigator, your AI-powered crypto research hub.
          </div>
        </div>
      </div>
    </div>
  );
}
