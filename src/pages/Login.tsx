import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { demoPassword, mockUsers, type Role } from "@/data/mock";

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean(),
});
type SignInValues = z.infer<typeof signInSchema>;

const ukPhone = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?|0)\d{2,4}\s?\d{3,4}\s?\d{3,4}$/;

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name").max(50),
    lastName: z.string().trim().min(1, "Enter your last name").max(50),
    email: z.string().trim().email("Enter a valid email address").max(255),
    phone: z.string().trim().regex(ukPhone, "Enter a UK phone number, e.g. +44 7700 900123"),
    role: z.enum(["patient", "provider"], { required_error: "Choose an account type" }),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms to continue" }) }),
  })
  .refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });
type SignUpValues = z.infer<typeof signUpSchema>;

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive">{message}</p> : null;

const dashboardFor = (role: Role) => (role === "patient" ? "/patient-dashboard" : "/provider-dashboard");

const Login = () => {
  const [params] = useSearchParams();
  const type: Role = params.get("type") === "provider" ? "provider" : "patient";
  const redirect = params.get("redirect");
  const [role, setRole] = useState<Role>(type);
  const [tab, setTab] = useState("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const goAfterLogin = (r: Role) => {
    const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : null;
    const allowed = safe && (r === "patient" ? !safe.startsWith("/provider") : !safe.startsWith("/patient") && safe !== "/medassist");
    navigate(allowed ? safe : dashboardFor(r));
  };

  const signIn = useForm<SignInValues>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "", remember: false } });
  const signUp = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", role: type, password: "", confirmPassword: "" },
  });

  const onSignIn = (v: SignInValues) => {
    const match = (Object.keys(mockUsers) as Role[]).find((r) => mockUsers[r].email === v.email.toLowerCase());
    if (!match || v.password !== demoPassword) {
      signIn.setError("password", { message: "Email or password is incorrect. Use the demo details above." });
      return;
    }
    const u = login(match, { remember: v.remember });
    toast({ title: `Welcome back, ${u.firstName}`, description: "You are signed in." });
    goAfterLogin(match);
  };

  const onSignUp = (v: SignUpValues) => {
    login(v.role, { user: { firstName: v.firstName, lastName: v.lastName, email: v.email, phone: v.phone } });
    toast({ title: "Account created", description: "This is a demo — your details stay on this device." });
    goAfterLogin(v.role);
  };

  const e1 = signIn.formState.errors;
  const e2 = signUp.formState.errors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-6 py-8">
        <Link to="/" className="flex items-center space-x-3 w-fit">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Medi-Path</h1>
            <p className="text-xs text-muted-foreground">Healthcare Platform</p>
          </div>
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>

          <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border-border/20">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">Welcome to Medi-Path</CardTitle>
              <CardDescription>Access your healthcare dashboard</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={role} onValueChange={(v) => { setRole(v as Role); signUp.setValue("role", v as Role); }} className="mb-4">
                <TabsList className="grid w-full grid-cols-2 rounded-lg border bg-muted/50 p-1">
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="provider">Provider</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Demo:</span> {mockUsers[role].email} / {demoPassword}
                </p>
              </div>

              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg border bg-muted/50 p-1">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={signIn.handleSubmit(onSignIn)} className="space-y-4" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder={mockUsers[role].email} className="pl-10" {...signIn.register("email")} />
                      </div>
                      <FieldError message={e1.email?.message} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="password" type="password" className="pl-10" {...signIn.register("password")} />
                      </div>
                      <FieldError message={e1.password?.message} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <Controller control={signIn.control} name="remember" render={({ field }) => (
                        <label className="flex items-center gap-2 text-muted-foreground">
                          <Checkbox checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
                          Remember me
                        </label>
                      )} />
                      <Link to="/forgot-password" className="text-primary hover:text-primary/80">Forgot password?</Link>
                    </div>
                    <Button type="submit" className="w-full" disabled={signIn.formState.isSubmitting}>Sign In</Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={signUp.handleSubmit(onSignUp)} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="firstName" className="pl-10" {...signUp.register("firstName")} />
                        </div>
                        <FieldError message={e2.firstName?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" {...signUp.register("lastName")} />
                        <FieldError message={e2.lastName?.message} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="signupEmail" type="email" placeholder="you@example.co.uk" className="pl-10" {...signUp.register("email")} />
                      </div>
                      <FieldError message={e2.email?.message} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+44 7700 900123" className="pl-10" {...signUp.register("phone")} />
                      </div>
                      <FieldError message={e2.phone?.message} />
                    </div>
                    <div className="space-y-2">
                      <Label>Account type</Label>
                      <Controller control={signUp.control} name="role" render={({ field }) => (
                        <Select value={field.value} onValueChange={(v) => { field.onChange(v); setRole(v as Role); }}>
                          <SelectTrigger aria-label="Account type"><SelectValue placeholder="Select account type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="provider">Healthcare Provider</SelectItem>
                          </SelectContent>
                        </Select>
                      )} />
                      <FieldError message={e2.role?.message} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="signupPassword" type="password" className="pl-10" {...signUp.register("password")} />
                      </div>
                      <FieldError message={e2.password?.message} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" type="password" className="pl-10" {...signUp.register("confirmPassword")} />
                      </div>
                      <FieldError message={e2.confirmPassword?.message} />
                    </div>
                    <div className="space-y-1">
                      <Controller control={signUp.control} name="terms" render={({ field }) => (
                        <label className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Checkbox className="mt-0.5" checked={field.value === true} onCheckedChange={(c) => field.onChange(c === true)} />
                          <span>
                            I agree to the{" "}
                            <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">Terms of Service</Link>{" "}
                            and{" "}
                            <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">Privacy Policy</Link>
                          </span>
                        </label>
                      )} />
                      <FieldError message={e2.terms?.message} />
                    </div>
                    <Button type="submit" className="w-full">Create Account</Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Need help?{" "}
                <Link to="/contact?topic=support" className="text-primary hover:text-primary/80">Contact Support</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
