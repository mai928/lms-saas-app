'use client';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '../constants/soundwaves.json';
import { content } from '@/tailwind.config';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callState, setCallState] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallState(CallStatus.ACTIVE);
    const oneCallEnd = () => setCallState(CallStatus.ENDED);
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', oneCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', oneCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, []);

  const toggleMicoPhone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallState(CallStatus.CONNECTING);

    const asisstantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ['transcript'],
      serverMessages: [],
    };
    //  @ts-expect-error
    vapi.start(configureAssistant(voice, style), asisstantOverrides);
  };
  const handleDisConnect = () => {
    setCallState(CallStatus.ENDED);
    vapi.stop();
  };

  console.log('messages:::', messages);
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callState === CallStatus.ENDED ||
                  callState === CallStatus.INACTIVE
                  ? 'opacity-100'
                  : 'opacity-0',
                callState === CallStatus.CONNECTING &&
                  'opacity-100 animate-pulse',
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt="subject"
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callState === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt="userImage"
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicoPhone}
            disabled={callState !== CallStatus.ACTIVE}
          >
            <Image
              alt="mic"
              src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? 'Turn on microPhone' : 'Turn Off Microphone'}
            </p>
          </button>

          <button
            onClick={
              callState === CallStatus.ACTIVE ? handleDisConnect : handleCall
            }
            className={cn(
              'rounded-lg py-2 cursor-pointer transition-all w-full text-white',
              callState === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary',
              callState === CallStatus.CONNECTING && 'animate-pulse',
            )}
          >
            {callState === CallStatus.ACTIVE
              ? 'End Session'
              : callState === CallStatus.CONNECTING
              ? 'Connecting'
              : 'Start Session'}
          </button>
        </div>
      </section>

      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === 'assistant') {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name?.split(' ')[0]?.replace('/[.,]/g', '')} :
                  {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}:{message.content}
                </p>
              );
            }
          })}
        </div>

        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
