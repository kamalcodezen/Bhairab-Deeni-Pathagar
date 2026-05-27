/* ============================================================================
   Borrows and Donations Data Mock Database (ধার ও দান সংক্রান্ত মক ডাটাবেজ)
   এখানে লাইব্রেরির বই ধার নেওয়া এবং দান করার ইতিহাস রেকর্ড করা হয়েছে।
   ============================================================================ */

import { BorrowRecord, DonationRecord } from '../types'

export const borrowsData: BorrowRecord[] = [
  { id:'b1', bookId:'1', userId:'2', userName:'মোহাম্মদ রাফি হোসেন', bookTitle:'রিয়াদুস সালেহীন', bookAuthor:'ইমাম নববী (রহ.)', bookCover:'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80', borrowDate:'2024-04-01T10:00:00Z', dueDate:'2024-04-15T10:00:00Z', returnDate:'2024-04-13T10:00:00Z', status:'returned' },
  { id:'b2', bookId:'3', userId:'2', userName:'মোহাম্মদ রাফি হোসেন', bookTitle:'আর-রাহীকুল মাখতুুম', bookAuthor:'সফিউর রহমান মুবারকপুরী', bookCover:'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=400&q=80', borrowDate:'2024-04-20T10:00:00Z', dueDate:'2024-05-04T10:00:00Z', returnDate:null, status:'active' },
  { id:'b3', bookId:'6', userId:'2', userName:'মোহাম্মদ রাফি হোসেন', bookTitle:'হিসনুল মুসলিম', bookAuthor:'সাঈদ ইবনে আলী আল-কাহতানী', bookCover:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80', borrowDate:'2024-05-01T10:00:00Z', dueDate:'2024-05-15T10:00:00Z', returnDate:null, status:'pending' },
  { id:'b4', bookId:'9', userId:'3', userName:'ফাতেমা বেগম', bookTitle:'এহইয়াউ উলুমিদ্দীন', bookAuthor:'ইমাম গাযালী (রহ.)', bookCover:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80', borrowDate:'2024-03-15T10:00:00Z', dueDate:'2024-03-29T10:00:00Z', returnDate:'2024-04-02T10:00:00Z', status:'returned' },
  { id:'b5', bookId:'2', userId:'4', userName:'আরিফ হোসেন', bookTitle:'তাফসীর ইবনে কাসীর', bookAuthor:'ইমাম ইবনে কাসীর (রহ.)', bookCover:'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', borrowDate:'2024-04-25T10:00:00Z', dueDate:'2024-05-09T10:00:00Z', returnDate:null, status:'active' },
  { id:'b6', bookId:'15', userId:'5', userName:'সাকিব হোসেন', bookTitle:'তাবলীগী নিসাব', bookAuthor:'মাওলানা মুহাম্মদ যাকারিয়া', bookCover:'https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=400&q=80', borrowDate:'2024-05-05T10:00:00Z', dueDate:'2024-05-19T10:00:00Z', returnDate:null, status:'pending' },
  { id:'b7', bookId:'8', userId:'6', userName:'নাসরীন আক্তার', bookTitle:'আরবি শিক্ষা', bookAuthor:'ড. ভি আব্দুর রহীম', bookCover:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', borrowDate:'2024-04-10T10:00:00Z', dueDate:'2024-04-24T10:00:00Z', returnDate:'2024-04-22T10:00:00Z', status:'returned' },
  { id:'b8', bookId:'4', userId:'7', userName:'রহিম উদ্দিন', bookTitle:'ইসলামী আকীদা', bookAuthor:'ড. উমর সুলাইমান আশকার', bookCover:'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', borrowDate:'2024-05-08T10:00:00Z', dueDate:'2024-05-22T10:00:00Z', returnDate:null, status:'active' },
]

export const donationsData: DonationRecord[] = [
  { id:'d1', userId:'2', userName:'মোহাম্মদ রাফি হোসেন', userAvatar:'https://i.pravatar.cc/150?img=12', bookTitle:'ইসলামের ইতিহাস', author:'একটি ইসলামিক প্রকাশনা', category:'সীরাত ও ইতিহাস', description:'ভালো অবস্থায় আছে।', condition:'ভালো', image:'https://images.unsplash.com/photo-1603162525937-97fef01f5f2c?w=400&q=80', donationDate:'2024-03-20T10:00:00Z', status:'approved' },
  { id:'d2', userId:'3', userName:'ফাতেমা বেগম', userAvatar:'https://i.pravatar.cc/150?img=5', bookTitle:'কুরআনের অনুবাদ ও তাফসীর', author:'ماওলানা আবদুল কারীম', category:'কুরআন ও তাফসীর', description:'নতুন অবস্থায় আছে।', condition:'নতুন', image:'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80', donationDate:'2024-04-05T10:00:00Z', status:'pending' },
  { id:'d3', userId:'4', userName:'আরিফ হোসেন', userAvatar:'https://i.pravatar.cc/150?img=8', bookTitle:'রিয়াদুস সালেহীন', author:'ইমাম নববী', category:'হাদীস শাস্ত্র', description:'কিছু পাতায় লেখা আছে।', condition:'মোটামুটি', image:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80', donationDate:'2024-04-15T10:00:00Z', status:'approved' },
  { id:'d4', userId:'5', userName:'সাকিব হোসেন', userAvatar:'https://i.pravatar.cc/150?img=15', bookTitle:'আরবি ব্যাকরণ', author:'ড. মুহাম্মদ আলী', category:'আরবি ভাষা', description:'একদম নতুন বই।', condition:'নতুন', image:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', donationDate:'2024-05-01T10:00:00Z', status:'pending' },
  { id:'d5', userId:'2', userName:'মোহাম্মদ রাফি হোসেন', userAvatar:'https://i.pravatar.cc/150?img=12', bookTitle:'শিশু সাহিত্য সংকলন', author:'বিভিন্ন লেখক', category:'শিশু সাহিত্য', description:'শিশুদের জন্য উপযুক্ত।', condition:'ভালো', image:'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80', donationDate:'2024-05-10T10:00:00Z', status:'rejected', rejectionReason:'বইটি আমাদের কাছে ইতিমধ্যে আছে।' },
]
