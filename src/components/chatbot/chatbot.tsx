
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getStreamingChatbotResponse, type ChatbotMessage } from '@/ai/flows/chatbot-flow';
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
import { useTranslation } from '@/hooks/use-translation';


export function Chatbot() {
  const { t, language } = useTranslation('chatbot');
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  
  useEffect(() => {
    setMessages([
      {
        role: 'model',
        content: t('initialMessage'),
      },
    ]);
  }, [t]);


  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
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
  }, [messages]);

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
    recognition.lang = language === 'ml' ? 'ml-IN' : 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript(t('listening'));
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

  const clearImage = () => {
    setImagePreview(null);
    setPhotoDataUri('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  async function handleSubmit(formData: FormData) {
    const message = formData.get('message') as string;
    const currentPhotoDataUri = photoDataUri;
    
    if (!message && !currentPhotoDataUri) {
        setError(t('error.noInput'));
        return;
    }

    setIsPending(true);
    setError(null);
    formRef.current?.reset();
    setImagePreview(null);
    setPhotoDataUri('');

    const newHistory: ChatbotMessage[] = [...messages, { role: 'user', content: message }];
    setMessages(newHistory);
    
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
        const stream = await getStreamingChatbotResponse({ history: newHistory, photoDataUri: currentPhotoDataUri });
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.role === 'model') {
                    const updatedMessages = [...prev];
                    updatedMessages[prev.length - 1] = {
                        ...lastMessage,
                        content: lastMessage.content + chunk
                    };
                    return updatedMessages;
                }
                return prev;
            });
        }
    } catch (e) {
        setError(t('error.unexpected'));
    } finally {
        setIsPending(false);
    }
  }

  return (
    <div className="h-full flex flex-col p-2 sm:p-4 md:p-6">
      <ScrollArea className="flex-1 mb-4 pr-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
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
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                 {message.role === 'model' && index === messages.length - 1 && isPending && (
                  <Loader2 className="h-4 w-4 animate-spin inline-block ml-2" />
                )}
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
          action={handleSubmit}
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
                isRecording ? transcript : t('inputPlaceholder')
              }
              autoComplete="off"
              className="flex-1"
              disabled={isPending}
            />
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
              disabled={isPending}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
               disabled={isPending}
            >
              <Paperclip />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleMicClick}
              className={cn(isRecording && 'bg-red-500/20 text-red-500')}
               disabled={isPending}
            >
              {isRecording ? <Loader2 className="animate-spin" /> : <Mic />}
            </Button>

            <Button type="submit" size="icon" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error.title')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
