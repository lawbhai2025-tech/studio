"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSchemeRecommendations, type SchemeRecommendationState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Sparkles, ListChecks } from "lucide-react";
import { Loader } from "@/components/loader";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader />
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Get Schemes
        </>
      )}
    </Button>
  );
}

export function SchemeRecommendationsForm() {
  const initialState: SchemeRecommendationState = {};
  const [state, formAction] = useActionState(getSchemeRecommendations, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.schemes) {
      // formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tell us about your farm, and our AI will suggest relevant government schemes for you.
      </p>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          id="profile"
          name="profile"
          placeholder="E.g., I have a 5-acre farm in Vidisha, MP. I primarily grow wheat and soybean. I am interested in micro-irrigation solutions."
          rows={5}
          required
        />
        <SubmitButton />
      </form>

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.schemes && (
        <Alert>
          <ListChecks className="h-4 w-4" />
          <AlertTitle>Recommended Schemes</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {state.schemes.map((scheme, index) => (
                <li key={index}>{scheme}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
