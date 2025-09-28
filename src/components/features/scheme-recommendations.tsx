
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { getSchemeRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Sparkles, Award } from 'lucide-react';
import { Loader } from '../loader';

export function SchemeRecommendations() {
  const [state, formAction, isPending] = useActionState(getSchemeRecommendations, { schemes: [], error: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && state?.schemes && state.schemes.length > 0) {
      formRef.current?.reset();
    }
  }, [isPending, state?.schemes]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalized Scheme Recommendations</CardTitle>
        <CardDescription>
          Describe your farm, location, and needs, and our AI will suggest relevant government schemes for you.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <Textarea
            id="profile"
            name="profile"
            placeholder="E.g., 'I am a small-scale farmer in Idukki district with 2 acres of land. I primarily grow cardamom and pepper. I am looking for financial assistance to set up drip irrigation.'"
            rows={5}
            required
          />
          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Find Schemes
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {state?.schemes && state.schemes.length > 0 && (
        <Card className="m-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Recommended Schemes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {state.schemes.map((scheme, index) => (
                <li key={index}>{scheme}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
