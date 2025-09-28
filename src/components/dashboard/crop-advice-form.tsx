"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { getCropAdvice, type CropAdviceState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Mic, FileText, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader />
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Get Advice
        </>
      )}
    </Button>
  );
}

export function CropAdviceForm() {
  const initialState: CropAdviceState = {};
  const [state, formAction] = useActionState(getCropAdvice, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('Listening...');
    };

    recognition.onresult = event => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(currentTranscript);
      if (detailsTextareaRef.current) {
        detailsTextareaRef.current.value = currentTranscript;
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTranscript('');
    };

    recognition.onerror = event => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
      setTranscript('');
    };

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  useEffect(() => {
    if (state.advice) {
      // Potentially clear form on success, or leave as is
    }
    if (state.error) {
      // Handle error display
    }
  }, [state]);

  const cropPlaceholder = PlaceHolderImages.find(p => p.id === 'crop-placeholder');

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload a photo of your crop, and our AI will analyze it for potential issues and provide solutions.
      </p>
      <form action={formAction} ref={formRef} className="space-y-4">
        <div className="space-y-2">
          <div className="aspect-video w-full rounded-md border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Crop preview"
                width={800}
                height={600}
                className="object-contain"
              />
            ) : (
                cropPlaceholder && <Image src={cropPlaceholder.imageUrl} alt={cropPlaceholder.description} width={800} height={600} className="object-cover opacity-30" data-ai-hint={cropPlaceholder.imageHint}/>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input id="image" name="image" type="file" accept="image/*" required onChange={handleImageChange} className="md:col-span-2" />
            <Button variant="outline" type="button" onClick={handleMicClick} className={cn(isRecording && 'bg-red-500/20 text-red-500')}>
              {isRecording ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mic className="mr-2 h-4 w-4" />}
               {isRecording ? "Stop" : "Voice Input"}
            </Button>
          </div>
        </div>

        <Textarea
          id="details"
          name="details"
          ref={detailsTextareaRef}
          placeholder={isRecording ? transcript : "Add any extra details, e.g., 'Leaves are turning yellow at the edges.'"}
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

      {state.advice && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>AI Crop Advice</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.advice.replace(/\n/g, '<br />') }} />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
