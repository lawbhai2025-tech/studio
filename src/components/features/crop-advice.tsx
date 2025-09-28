
'use client';

import { useActionState, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { getCropAdvice } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Upload, Sparkles, Mic, Loader2, X } from 'lucide-react';
import { Loader } from '../loader';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function CropAdvice() {
  const [state, formAction, isPending] = useActionState(getCropAdvice, { advice: '', error: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const detailsTextareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const placeholderImage = PlaceHolderImages.find(img => img.id === 'crop-placeholder');

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
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setTranscript(currentTranscript);
      if (detailsTextareaRef.current) {
        detailsTextareaRef.current.value = currentTranscript;
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTranscript('');
      recognition.stop();
    };

    recognition.onerror = (event) => {
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

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!isPending && state?.advice) {
      formRef.current?.reset();
      setImagePreview(null);
    }
  }, [isPending, state?.advice]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crop Disease Prediction</CardTitle>
        <CardDescription>
          Upload a picture of your crop, and our AI will analyze it to detect potential diseases and suggest remedies.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="aspect-video w-full rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative">
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="Crop preview" layout="fill" objectFit="cover" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/75 text-white"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center text-gray-500 space-y-2">
                   {placeholderImage && (
                    <Image
                        src={placeholderImage.imageUrl}
                        alt={placeholderImage.description}
                        width={100}
                        height={100}
                        className="mx-auto rounded-md"
                        data-ai-hint={placeholderImage.imageHint}
                      />
                  )}
                  <p>Upload a clear image of the affected crop area</p>
                </div>
              )}
            </div>
            <Input
              id="image"
              name="image"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
              required
            />
            <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </Button>
          </div>

          <div className="space-y-2 relative">
            <Textarea
              id="details"
              name="details"
              ref={detailsTextareaRef}
              placeholder={isRecording ? transcript : "Optionally, add more details like when you first noticed the issue, any recent changes in weather, etc."}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleMicClick}
              className={cn('absolute top-2 right-2 h-7 w-7', isRecording && 'bg-red-500/20 text-red-500')}
            >
              {isRecording ? <Loader2 className="animate-spin" /> : <Mic />}
            </Button>
          </div>
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
                Get AI Advice
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {state?.advice && (
        <Card className="m-6 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-green-600" />
              AI Generated Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 whitespace-pre-wrap">{state.advice}</p>
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
