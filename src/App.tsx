/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  HeartPulse, 
  Flower2, 
  Baby, 
  Stethoscope, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const SECTIONS = [
  { id: 'treatment', label: '진료과목' },
  { id: 'location', label: '병원위치' },
  { id: 'hours', label: '운영시간' },
  { id: 'intro', label: '원장 소개' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white py-6 text-center border-b border-gray-100">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-green">
          송현한의원
        </h1>
      </header>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="flex justify-around border-b border-gray-100">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex-1 py-4 text-[15px] font-medium transition-colors relative ${
                activeSection === section.id ? 'text-brand-green' : 'text-gray-400'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="intro" className="w-full bg-white">
          <img 
            src="../public/banner.png" 
            alt="송현한의원"
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
        </section>

        {/* Location Section */}
        <section id="location" className="section-margin py-16 bg-brand-bg">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-serif text-2xl font-bold">찾아오시는 길</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white rounded-full text-xs font-medium border border-gray-200 shadow-sm flex items-center gap-1">
                네이버 지도 <ExternalLink size={12} />
              </button>
              <button className="px-3 py-1.5 bg-white rounded-full text-xs font-medium border border-gray-200 shadow-sm flex items-center gap-1">
                카카오맵 <ExternalLink size={12} />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-bold">옥동 경북대로 432</p>
            <p className="text-brand-muted leading-relaxed">
              권내과 맞은편 수외과 건물 1층입니다.
            </p>
          </div>
        </section>

        {/* Operating Hours Section */}
        <section id="hours" className="section-margin py-16 bg-white">
          <div className="flex items-center gap-2 mb-8">
            <h3 className="font-serif text-2xl font-bold">언제나 편하게 내원하세요</h3>
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              현재 진료중
            </span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-bg rounded-2xl p-6 space-y-6 border border-gray-100"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-muted shadow-sm">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <p className="text-brand-green font-bold text-sm mb-1">평일 진료</p>
                <p className="text-lg font-bold">09:30 - 19:00</p>
                <p className="text-sm text-brand-muted mt-1">(점심시간 13:00 - 14:00)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-muted shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <p className="text-brand-green font-bold text-sm mb-1">토요일 진료</p>
                <p className="text-lg font-bold">09:30 - 14:00</p>
                <p className="text-sm text-brand-muted mt-1">(점심시간 없이 진료)</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-muted shadow-sm">
                <Calendar size={20} className="text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-red-400 font-bold text-sm mb-1">일요일 / 공휴일</p>
                <p className="text-lg font-bold">휴진입니다.</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-3">
            <p className="text-sm text-brand-muted flex items-start gap-2">
              <span className="text-brand-green font-bold">※</span>
              접수 마감은 진료 종료 30분 전입니다.
            </p>
            <p className="text-sm text-brand-muted flex items-start gap-2">
              <span className="text-brand-green font-bold">※</span>
              매월 마지막 주 수요일은 토요일과 동일하게 진료합니다.
            </p>
            <p className="text-sm text-brand-muted flex items-start gap-2">
              <span className="text-brand-green font-bold">※</span>
              일요일 및 공휴일 휴진
            </p>
          </div>
        </section>

        {/* Treatment Subjects Section */}
        <section id="treatment" className="section-margin py-16 bg-brand-bg">
          <h3 className="font-serif text-2xl font-bold mb-8">주요 진료과목</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { 
                icon: Activity, 
                title: '통증 클리닉', 
                desc: '만성적인 통증부터 급성 염좌까지, 근본적인 원인을 찾아 치료합니다.' 
              },
              { 
                icon: HeartPulse, 
                title: '교통사고 후유증', 
                desc: '사고 직후에는 나타나지 않는 미세한 손상과 어혈을 제거합니다.' 
              },
              { 
                icon: Flower2, 
                title: '여성 질환', 
                desc: '여성의 생애 주기에 맞춘 따뜻하고 세심한 진료를 제공합니다.' 
              },
              { 
                icon: Baby, 
                title: '소아 성장', 
                desc: '아이들의 올바른 성장과 면역력 강화를 위한 기초를 다집니다.' 
              },
              { 
                icon: Stethoscope, 
                title: '보약 / 공진단', 
                desc: '기력이 쇠한 분들을 위한 정성 어린 맞춤 보약을 조제합니다.' 
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-margin py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-green rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">상담 예약을 원하시나요?</h3>
              <p className="text-white/80 text-sm mb-6">친절하고 빠르게 예약을 도와드리겠습니다.</p>
              <p className="text-3xl font-serif font-bold mb-8">054-858-7067</p>
              
              <a 
                href="tel:054-858-7067"
                className="inline-flex items-center gap-2 bg-white text-brand-green px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Phone size={20} fill="currentColor" />
                전화 예약하기
              </a>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 section-margin">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold">송현한의원</h2>
          
          <div className="space-y-2 text-sm text-gray-400">
            <p>대표: 이상윤</p>
            <p>전화: 054-858-0877</p>
            <p>주소: 경상북도 안동시 옥동 경북대로 432</p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-gray-500">
              © 2026 송현한의원. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile Only) */}
      <motion.a
        href="tel:054-858-7067"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-green text-white rounded-full shadow-2xl flex items-center justify-center z-[60] md:hidden"
      >
        <Phone size={24} fill="currentColor" />
      </motion.a>
    </div>
  );
}
