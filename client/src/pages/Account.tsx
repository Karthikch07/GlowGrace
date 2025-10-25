import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function Account() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (e: any) {
      setError(e?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    setError(null);
    setLoading(true);
    try {
      await signUp({ email, password, firstName, lastName });
    } catch (e: any) {
      setError(e?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <Card className="p-6 max-w-md">
        {!user ? (
          <div>
            <div className="flex gap-2 mb-4">
              <Button variant={mode === "signin" ? "default" : "outline"} onClick={() => setMode("signin")}>
                Sign In
              </Button>
              <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>
                Sign Up
              </Button>
            </div>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className="space-y-2">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail((e as any).target.value)} />
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword((e as any).target.value)} />
              {mode === "signup" && (
                <>
                  <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName((e as any).target.value)} />
                  <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName((e as any).target.value)} />
                </>
              )}
              <div className="flex gap-2 mt-3">
                {mode === "signin" ? (
                  <Button onClick={handleSignIn} disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
                ) : (
                  <Button onClick={handleSignUp} disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">{user.firstName ? `${user.firstName} ${user.lastName || ""}` : user.email}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-4">
              <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
