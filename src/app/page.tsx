
'use client';

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Phone, MapPin, Mic, Camera, LineChart, Bell, ArrowRight, ChevronRight, PlayCircle, Paperclip, Send } from "lucide-react";
import Link from "next/link";
import { WeatherCard } from "@/components/features/weather-card";
import { MandiPrices } from "@/components/features/mandi-prices";
import { useTranslation } from "@/hooks/use-translation";

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white text-gray-800">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <DashboardSection />
      </main>
    </div>
  );
}

const TopBar = () => {
  const { t } = useTranslation('home');
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">{t('topBar.helpline')}</span>
            <span className="md:hidden">{t('topBar.helplineShort')}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{t('topBar.location')}</span>
          </div>
        </div>
      </div>
    </div>
  )
};


const HeroSection = () => {
  const { t } = useTranslation('home');
  return (
    <section className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-center md:text-left">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
          {t('hero.badge')}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900" dangerouslySetInnerHTML={{ __html: t('hero.title') }}>
        </h1>
        <p className="text-lg text-gray-600">
          {t('hero.subtitle')}
        </p>
        <p className="text-gray-500 max-w-xl mx-auto md:mx-0">
          {t('hero.description')}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm max-w-md mx-auto md:mx-0">
          <FeatureCard icon={<Mic className="text-purple-600" />} text={t('hero.features.voice')} />
          <FeatureCard icon={<Camera className="text-orange-600" />} text={t('hero.features.photo')} />
          <FeatureCard icon={<LineChart className="text-blue-600" />} text={t('hero.features.market')} />
          <FeatureCard icon={<Bell className="text-red-600" />} text={t('hero.features.weather')} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
          <Link href="/chatbot">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg w-full sm:w-auto">
              {t('hero.cta.start')} <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="bg-white hover:bg-gray-50 shadow-lg w-full sm:w-auto">
            {t('hero.cta.howItWorks')} <PlayCircle className="ml-2" />
          </Button>
        </div>
        <div className="text-center md:text-left pt-2">
            <Button variant="link" className="text-amber-600 hover:text-amber-700">
                {t('hero.cta.download')}
            </Button>
        </div>


        <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-8 pt-6">
          <Stat value="50k+" label={t('hero.stats.farmers')} />
          <Stat value="2L+" label={t('hero.stats.queries')} />
          <Stat value="95%" label={t('hero.stats.satisfaction')} />
          <Stat value="<30s" label={t('hero.stats.response')} />
        </div>
      </div>
      <div className="relative hidden md:block">
         <div className="absolute -inset-2 bg-gradient-to-br from-green-200 via-emerald-200 to-yellow-100 rounded-full opacity-50 blur-2xl"></div>
        <ChatPreview />
      </div>
    </div>
  </section>
  )
};

const DashboardSection = () => {
  const { t } = useTranslation('home');
  return (
  <section className="bg-gray-50/70 py-16 md:py-24">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {t('dashboard.title')}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {t('dashboard.subtitle')}
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherCard />
        <MandiPrices />
      </div>
    </div>
  </section>
  )
};

const FeatureCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3 border border-gray-200/50 shadow-sm">
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <p className="text-xl sm:text-2xl font-bold text-green-600">{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">{label}</p>
  </div>
);


const ChatPreview = () => {
  const { t } = useTranslation('home');

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-3xl h-[550px] w-[280px] shadow-2xl">
      <div className="h-full rounded-t-3xl overflow-hidden bg-white dark:bg-white">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="bg-green-600 text-white p-3 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center font-bold">K</div>
              <div>
                <p className="font-bold text-sm">{t('chatPreview.header.title')}</p>
                <p className="text-xs text-green-100">{t('chatPreview.header.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Paperclip className="w-4 h-4 opacity-80" />
              <Phone className="w-4 h-4 opacity-80" />
            </div>
          </div>
          
          {/* Chat Body */}
          <div className="flex-1 p-3 space-y-4 overflow-y-auto bg-green-50/30">
            {
              t('chatPreview.messages', { returnObjects: true }).map((msg: any, i: number) => (
                msg.type === 'image' 
                ? (
                  <div key={i} className="flex justify-start">
                    <div className="bg-white p-2 rounded-lg shadow-sm w-28 h-20">
                        <Image data-ai-hint="paddy field" src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200" alt="Paddy field" width={100} height={70} className="rounded" />
                    </div>
                  </div>
                )
                : <ChatMessage key={i} role={msg.role} time={msg.time}>{msg.content}</ChatMessage>
              ))
            }
          </div>
          
          {/* Chat Input */}
          <div className="bg-white p-2 border-t flex items-center gap-2">
            <Mic className="w-5 h-5 text-gray-500" />
            <input type="text" placeholder={t('chatPreview.inputPlaceholder')} className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm focus:outline-none" />
            <Button size="icon" variant="ghost" className="w-8 h-8">
              <Send className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ role, time, children }: { role: 'user' | 'model', time: string, children: React.ReactNode }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[80%] p-2 rounded-lg shadow-sm ${isUser ? 'bg-white rounded-br-none' : 'bg-green-600 text-white rounded-bl-none'}`}>
        <p className="text-sm">{children}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-gray-400' : 'text-green-100/70'} text-right`}>
          {time} {role === 'model' && '✓✓'}
        </p>
      </div>
    </div>
  );
};
