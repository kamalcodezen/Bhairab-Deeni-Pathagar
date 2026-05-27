// ============================================================================
// প্রজেক্টের সমস্ত এন্টারপ্রাইজ টাইপ ইন্টারফেস সমূহ
// এই ফাইলটি পুরো অ্যাপের টাইপ সেফটি এবং ডাটা ইন্টিগ্রিটি নিশ্চিত করে।
// ============================================================================

// ১. User ইন্টারফেস — লাইব্রেরির সাধারণ ইউজার এবং অ্যাডমিনদের জন্য
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone: string;
  avatar: string;
  joinDate: string;
  address: string;
  borrowedCount: number;
  donatedCount: number;
  status?: 'active' | 'suspended';
}

// ২. Book ইন্টারফেস — বইয়ের সমস্ত প্রপার্টি সংজ্ঞায়িত করে
export interface Book {
  id: string;
  title: string;
  author: string;
  translator: string | null;
  category: string;
  categorySlug: string;
  cover: string;
  description: string;
  pages: number;
  publisher: string;
  publishYear: number;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  rating: number;
  reviewCount: number;
  borrowCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
  language: string;
  createdAt?: string;
  pageCount?: number;
  categoryId?: string;
}

// ৩. Category ইন্টারফেস — বইয়ের ক্যাটাগরি ম্যাপিং
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
  description: string;
}

// ৪. BorrowRecord ইন্টারফেস — কোন ইউজার কোন বই ধার নিয়েছেন তার হিসেব
export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'pending' | 'active' | 'returned' | 'rejected';
}

// ৫. DonationRecord — বই দান করার আবেদন এবং অবস্থা
export interface DonationRecord {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  bookTitle: string;
  author: string;
  category: string;
  description: string;
  condition: 'নতুন' | 'ভালো' | 'মোটামুটি' | string;
  image: string;
  donationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

// ৬. Donor ইন্টারফেস — যারা বই দান করেছেন তাদের তথ্য
export interface Donor {
  id: string;
  name: string;
  avatar: string;
  donationCount: number;
  totalBooks: number;
  badge: 'প্লাটিনাম' | 'সোনালী' | 'রূপালী' | 'ব্রোঞ্জ' | string;
  joinYear: number;
  city: string;
}

// ৭. Testimonial ইন্টারফেস — ইউজারদের মতামত ও রিভিউ
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

// ৮. Notification ইন্টারফেস — ব্যবহারকারীদের নোটিফিকেশন অ্যালার্ট
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// ৯. Stats — ড্যাশবোর্ড অ্যানালিটিক্স পরিসংখ্যান
export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  totalBorrows: number;
  totalDonors: number;
  booksThisMonth: number;
  membersThisMonth: number;
  borrowsThisMonth: number;
  donationsThisMonth: number;
}

// ১০. ChartData — ড্যাশবোর্ড গ্রাফ রেন্ডার করার ডাটা টাইপ
export interface ChartData {
  monthlyBorrows: { month: string; borrows: number; returns: number }[];
  categoryDistribution: { name: string; value: number }[];
  monthlyDonations: { month: string; count: number }[];
}

// ১১. FAQ ইন্টারফেস — প্রশ্নোত্তর সেকশন
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ১২. Theme Context Type
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

// ১৩. Auth Context Type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<User>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

// ১৪. Library Context Type
export interface LibraryContextType {
  books: Book[];
  borrows: BorrowRecord[];
  wishlist: string[];
  userBorrows: BorrowRecord[];
  wishlistBooks: Book[];
  toggleWishlist: (bookId: string) => void;
  borrowBook: (bookId: string) => void;
  returnBook: (borrowId: string) => void;
  addBook: (bookData: Omit<Book, 'id' | 'rating' | 'reviewCount' | 'borrowCount' | 'createdAt'>) => Book;
  updateBook: (bookId: string, updatedData: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  approveBorrow: (borrowId: string) => void;
  rejectBorrow: (borrowId: string) => void;
  isInWishlist: (id: string) => boolean;
}

// ১৫. CartItem — কার্ট আইটেমের টাইপ
export interface CartItem {
  book: Book;
  quantity: number;
}

// ১৬. CartContextType — কার্ট কন্টেক্সটের টাইপ
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  cartCount: number;
}

// ১৭. WishlistContextType — উইশলিস্ট কন্টেক্সটের টাইপ
export interface WishlistContextType {
  wishlistItems: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  toggleWishlist: (book: Book) => void;
  isWishlisted: (bookId: string) => boolean;
  clearWishlist: () => void;
}

