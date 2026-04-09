'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Loader2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface LoginFormProps {
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

const countryCodes = [
  { value: '+91', label: '+91', country: 'India' },
  { value: '+1', label: '+1', country: 'US' },
  { value: '+44', label: '+44', country: 'UK' },
  { value: '+971', label: '+971', country: 'UAE' },
  { value: '+61', label: '+61', country: 'Australia' },
  { value: '+65', label: '+65', country: 'Singapore' },
];

const formVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
};

export default function LoginForm({ onLogin, onForgotPassword, onRegister }: LoginFormProps) {
  // Email tab state
  const [workspaceCode, setWorkspaceCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});
  const [emailLoading, setEmailLoading] = useState(false);

  // OTP tab state
  const [otpWorkspaceCode, setOtpWorkspaceCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [whatsappOtp, setWhatsappOtp] = useState(false);
  const [otpErrors, setOtpErrors] = useState<Record<string, string>>({});
  const [otpLoading, setOtpLoading] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  // Caps lock detection
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'CapsLock') {
      setCapsLockOn((prev) => !prev);
    }
  }, []);

  // Validate email form
  const validateEmailForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    if (!workspaceCode.trim()) {
      errors.workspaceCode = 'Workspace code is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setEmailErrors(errors);
    return Object.keys(errors).length === 0;
  }, [workspaceCode, email, password]);

  // Validate OTP form
  const validateOtpForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    if (!otpWorkspaceCode.trim()) {
      errors.workspaceCode = 'Workspace code is required';
    }
    if (!phoneNumber.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(phoneNumber.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    setOtpErrors(errors);
    return Object.keys(errors).length === 0;
  }, [otpWorkspaceCode, phoneNumber]);

  // Handle email login submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailForm()) return;
    setEmailLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setEmailLoading(false);
    onLogin();
  };

  // Handle OTP send submit
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtpForm()) return;
    setOtpLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOtpLoading(false);
    onLogin();
  };

  // Clear field errors on change
  const handleWorkspaceCodeChange = (val: string) => {
    setWorkspaceCode(val);
    if (emailErrors.workspaceCode) {
      setEmailErrors((prev) => {
        const next = { ...prev };
        delete next.workspaceCode;
        return next;
      });
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailErrors.email) {
      setEmailErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (emailErrors.password) {
      setEmailErrors((prev) => {
        const next = { ...prev };
        delete next.password;
        return next;
      });
    }
  };

  const handleOtpWorkspaceChange = (val: string) => {
    setOtpWorkspaceCode(val);
    if (otpErrors.workspaceCode) {
      setOtpErrors((prev) => {
        const next = { ...prev };
        delete next.workspaceCode;
        return next;
      });
    }
  };

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/[^\d\s]/g, '');
    setPhoneNumber(cleaned);
    if (otpErrors.phone) {
      setOtpErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border-gray-200/60 shadow-sm">
          <CardHeader className="space-y-2 pb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome back
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm text-gray-500">
                Sign in to your workspace to continue
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
                <TabsTrigger
                  value="email"
                  className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900"
                >
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="otp"
                  className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900"
                >
                  <Phone className="mr-1.5 h-3.5 w-3.5" />
                  Mobile OTP
                </TabsTrigger>
              </TabsList>

              {/* Email Login Tab */}
              <TabsContent value="email">
                <motion.form
                  onSubmit={handleEmailSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {/* Workspace Code */}
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="workspace-code" className="text-sm font-medium text-gray-700">
                      Workspace / Company Code
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="workspace-code"
                        type="text"
                        placeholder="e.g. acme-corp"
                        value={workspaceCode}
                        onChange={(e) => handleWorkspaceCodeChange(e.target.value)}
                        className={`pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20 ${
                          emailErrors.workspaceCode ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {emailErrors.workspaceCode && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {emailErrors.workspaceCode}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20 ${
                          emailErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {emailErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {emailErrors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        ref={passwordRef}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        className={`pl-10 pr-10 h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20 ${
                          emailErrors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {emailErrors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {emailErrors.password}
                        </motion.p>
                      )}
                      {capsLockOn && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1 text-xs text-amber-600"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Caps Lock is on
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    variants={fieldVariants}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                        className="h-4 w-4 rounded border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                      />
                      <Label
                        htmlFor="remember"
                        className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                      >
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fieldVariants}>
                    <Button
                      type="submit"
                      disabled={emailLoading}
                      className="h-11 w-full rounded-xl bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 active:bg-gray-950"
                    >
                      <AnimatePresence mode="wait">
                        {emailLoading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            Sign In
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.form>

                {/* Register Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 text-center"
                >
                  <p className="text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={onRegister}
                      className="font-semibold text-gray-900 transition-colors hover:text-gray-700"
                    >
                      Create one
                    </button>
                  </p>
                </motion.div>
              </TabsContent>

              {/* Mobile OTP Tab */}
              <TabsContent value="otp">
                <motion.form
                  onSubmit={handleOtpSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {/* Workspace Code */}
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="otp-workspace" className="text-sm font-medium text-gray-700">
                      Workspace / Company Code
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="otp-workspace"
                        type="text"
                        placeholder="e.g. acme-corp"
                        value={otpWorkspaceCode}
                        onChange={(e) => handleOtpWorkspaceChange(e.target.value)}
                        className={`pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20 ${
                          otpErrors.workspaceCode ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {otpErrors.workspaceCode && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {otpErrors.workspaceCode}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Phone Number with Country Code */}
                  <motion.div variants={fieldVariants} className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-[110px] h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 focus:border-gray-400 focus:ring-gray-400/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((cc) => (
                            <SelectItem key={cc.value} value={cc.value}>
                              <span className="flex items-center gap-1.5">
                                <span className="font-medium">{cc.value}</span>
                                <span className="text-xs text-gray-400">{cc.country}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={phoneNumber}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={`pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20 ${
                            otpErrors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                          }`}
                        />
                      </div>
                    </div>
                    <AnimatePresence>
                      {otpErrors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {otpErrors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* WhatsApp OTP Toggle */}
                  <motion.div
                    variants={fieldVariants}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 p-3"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor="whatsapp-otp" className="text-sm font-medium text-gray-700">
                        Send via WhatsApp
                      </Label>
                      <p className="text-xs text-gray-400">
                        Receive OTP on WhatsApp for faster access
                      </p>
                    </div>
                    <Switch
                      id="whatsapp-otp"
                      checked={whatsappOtp}
                      onCheckedChange={setWhatsappOtp}
                      className="data-[state=checked]:bg-gray-900"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fieldVariants}>
                    <Button
                      type="submit"
                      disabled={otpLoading}
                      className="h-11 w-full rounded-xl bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 active:bg-gray-950"
                    >
                      <AnimatePresence mode="wait">
                        {otpLoading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending OTP...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            Send OTP
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.form>

                {/* Register Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 text-center"
                >
                  <p className="text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={onRegister}
                      className="font-semibold text-gray-900 transition-colors hover:text-gray-700"
                    >
                      Create one
                    </button>
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
