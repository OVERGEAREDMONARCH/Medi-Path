import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().trim().min(1, "Please enter your email address").email("Please enter a valid email address").max(255, "Email must be under 255 characters"),
});
type FormValues = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  return (
    <PageShell title="Reset your password" intro="Enter the email address on your account." centered>
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          {sent ? (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
              <p>If an account exists, we've sent a reset link.</p>
              <Button asChild className="w-full"><Link to="/login">Back to sign in</Link></Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send reset link"}</Button>
              <p className="text-sm text-center"><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></p>
            </form>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default ForgotPassword;
