'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getChatbotResponseAction, type ChatbotState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle,
  Bot,
  Send,
  User,
  Paperclip,
  Mic,
  X,
  Loader2,
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { Loader } from '../loader';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader /> : <Send />}
    </Button>
  );
}

export function Chatbot() {
  const initialState: ChatbotState = {
    messages: [
      {
        role: 'model',
        content:
          'Hello! I am Krishi Dost, your AI assistant. How can I help you with your farming needs today?',
      },
    ],
  };
  const [state, formAction] = useActionState(getChatbotResponseAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photoDataUri, setPhotoDataUri] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const messageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (!state.error && formRef.current) {
      formRef.current.reset();
      setImagePreview(null);
      setPhotoDataUri('');
      setTranscript('');
      if (messageInputRef.current) {
        messageInputRef.current.value = '';
      }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setPhotoDataUri(result);
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
      if (messageInputRef.current) {
        messageInputRef.current.value = currentTranscript;
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (messageInputRef.current && transcript !== 'Listening...') {
        // The transcript is already in the input field from onresult
      }
      setTranscript(''); // Clear after setting input
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

  const clearImage = () => {
    setImagePreview(null);
    setPhotoDataUri('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6">
      <ScrollArea className="flex-1 mb-4 pr-4">
        <div className="space-y-6">
          {state.messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'p-3 rounded-lg max-w-lg',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="space-y-4">
        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col gap-2"
        >
          {imagePreview && (
            <div className="relative w-32 h-32 rounded-md overflow-hidden border">
              <Image
                src={imagePreview}
                alt="Image preview"
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/75 text-white"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Input
              id="message"
              name="message"
              ref={messageInputRef}
              placeholder={
                isRecording ? transcript : 'Ask Krishi Dost anything...'
              }
              autoComplete="off"
              className="flex-1"
            />
            <input
              type="hidden"
              name="history"
              value={JSON.stringify(state.messages)}
            />
            <input
              type="hidden"
              name="photoDataUri"
              value={photoDataUri}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleMicClick}
              className={cn(isRecording && 'bg-red-500/20 text-red-500')}
            >
              {isRecording ? <Loader2 className="animate-spin" /> : <Mic />}
            </Button>

            <SubmitButton />
          </div>
        </form>

        {state.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
