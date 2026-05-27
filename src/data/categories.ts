/* ============================================================================
   Categories Data Mock Database (ক্যাটাগরি মক ডাটাবেজ)
   এখানে লাইব্রেরির সকল বইয়ের ক্যাটাগরি এবং পরিসংখ্যান সংরক্ষণ করা হয়েছে।
   ============================================================================ */

import { Category } from '../types'

export const categoriesData: Category[] = [
  { id: '1', name: 'কুরআন ও তাফসীর', slug: 'quran-tafsir', icon: '📖', count: 45, color: 'teal', description: 'কুরআনুল কারীম এবং তাফসীর সংক্রান্ত বই' },
  { id: '2', name: 'হাদীস শাস্ত্র',   slug: 'hadith',       icon: '📚', count: 38, color: 'emerald', description: 'হাদীস ও সুন্নাহ বিষয়ক গ্রন্থ' },
  { id: '3', name: 'ফিকহ ও মাসায়েল', slug: 'fiqh',         icon: '⚖️', count: 52, color: 'blue', description: 'ইসলামী আইন ও বিধিবিধান' },
  { id: '4', name: 'সীরাত ও ইতিহাস', slug: 'sirat',        icon: '🕌', count: 31, color: 'purple', description: 'নবীজীর জীবনী ও ইসলামের ইতিহাস' },
  { id: '5', name: 'আকীদা ও বিশ্বাস', slug: 'aqeedah',     icon: '✨', count: 28, color: 'amber', description: 'ইসলামী আকীদা ও বিশ্বাসের বই' },
  { id: '6', name: 'আরবি ভাষা',       slug: 'arabic',      icon: '🔤', count: 24, color: 'rose', description: 'আরবি ভাষা শেখার বই' },
  { id: '7', name: 'সাহিত্য ও কবিতা', slug: 'literature',  icon: '✍️', count: 19, color: 'indigo', description: 'বাংলা ও ইসলামী সাহিত্য' },
  { id: '8', name: 'শিশু সাহিত্য',    slug: 'children',    icon: '🌟', count: 22, color: 'yellow', description: 'শিশুদের জন্য ইসলামী বই' },
  { id: '9', name: 'দাওয়াহ ও তাবলীগ', slug: 'dawah',      icon: '🌙', count: 16, color: 'cyan', description: 'দাওয়াহ ও ইসলাম প্রচার' },
  { id: '10', name: 'তাসাউফ ও আত্মশুদ্ধি', slug: 'tasawwuf', icon: '💫', count: 18, color: 'pink', description: 'আত্মিক উন্নয়ন ও তাসাউফ' },
  { id: '11', name: 'বিজ্ঞান ও প্রযুক্তি', slug: 'science', icon: '🔬', count: 13, color: 'lime', description: 'বিজ্ঞান ও আধুনিক প্রযুক্তি' },
  { id: '12', name: 'সাধারণ জ্ঞান',    slug: 'general',    icon: '🧠', count: 17, color: 'orange', description: 'সাধারণ জ্ঞান ও তথ্য' },
]
