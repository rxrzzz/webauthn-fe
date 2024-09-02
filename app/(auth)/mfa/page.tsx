"use client";
import { Button } from "@/components/ui/button";
import { useMFA } from "../_core/forms";
import { useUserStore } from "@/store/user.store";
import { FingerprintIcon, InfoIcon, MoreHorizontal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FormHeader } from "../components/form-header";

const MFAPage = () => {
  const { user } = useUserStore();
  const { loading, triggerWebMFARegistration, triggerWebMFAAuthentication } =
    useMFA();
  return (
    <div>
      <FormHeader title="Secure access with passkeys" />
      <Alert className="mt-10">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>
          We're combining passkeys with a password for strong authentication
        </AlertTitle>
        <AlertDescription>
          Passkeys use cryptographic key pairs and biometric data to provide
          strong, phishing-resistant authentication.
        </AlertDescription>
      </Alert>
      <Button
        className="font-satoshi w-full  gap-4 max-w-[500px] mt-10"
        onClick={async () => {
          if (user.mfaEnabled) {
            await triggerWebMFAAuthentication();
          } else {
            await triggerWebMFARegistration();
          }
        }}
      >
        {loading ? (
          <MoreHorizontal size={20} className="animate-bounce" />
        ) : (
          <>
            <FingerprintIcon />
            <span className="text-md">Click to enter passkey</span>
          </>
        )}
      </Button>
    </div>
  );
};
export default MFAPage;
