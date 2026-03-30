// Authentication Module - LocalStorage ga asoslangan
class AuthManager {
  constructor() {
    this.currentUser = this.loadCurrentUser();
  }

  // Oddiy hash funksiya (production uchun bcrypt ishlatish kerak)
  hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  // Foydalanuvchi ro'yxatdan o'tkazish
  signup(username, password) {
    const users = this.getAllUsers();
    
    // Username allaqachon mavjudmi?
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already taken' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const newUser = {
      id: this.generateId(),
      username: username,
      passwordHash: this.hashPassword(password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Avtomatik kirish
    this.login(username, password);
    
    return { success: true, user: newUser };
  }

  // Kirishni tekshirish
  login(username, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.passwordHash !== this.hashPassword(password)) {
      return { success: false, error: 'Incorrect password' };
    }

    // Session tokenini yaratish va saqlash
    const token = this.generateId();
    const session = {
      token: token,
      userId: user.id,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentSession', JSON.stringify(session));
    this.currentUser = user;
    
    return { success: true, user: user };
  }

  // Chiqish
  logout() {
    localStorage.removeItem('currentSession');
    this.currentUser = null;
    return { success: true };
  }

  // Joriy foydalanuvchini olish
  getCurrentUser() {
    const session = localStorage.getItem('currentSession');
    if (!session) {
      this.currentUser = null;
      return null;
    }

    const sessionData = JSON.parse(session);
    const users = this.getAllUsers();
    const user = users.find(u => u.id === sessionData.userId);
    
    this.currentUser = user;
    return user;
  }

  // Foydalanuvchi autentifikatsiya qilganmi?
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Barcha foydalanuvchilarni olish
  getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  // Foydalanuvchi ID bilan olish
  getUserById(userId) {
    const users = this.getAllUsers();
    return users.find(u => u.id === userId);
  }

  // Foydalanuvchi ma'lumotlarini yangilash
  updateUser(userId, updates) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('users', JSON.stringify(users));
    this.currentUser = users[userIndex];
    
    return { success: true, user: users[userIndex] };
  }

  // Joriy foydalanuvchini saqlash
  loadCurrentUser() {
    const session = localStorage.getItem('currentSession');
    if (!session) return null;

    const sessionData = JSON.parse(session);
    const users = this.getAllUsers();
    return users.find(u => u.id === sessionData.userId) || null;
  }

  // Unique ID yaratish
  generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}

// Global instance
const auth = new AuthManager();
