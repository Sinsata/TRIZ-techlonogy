// Progress Tracking Module - LocalStorage ga asoslangan
class ProgressManager {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem('progress')) {
      localStorage.setItem('progress', JSON.stringify([]));
    }
  }

  // Lesson ni tugatilgan sifatida belgilash
  completeLesson(userId, courseId, lessonId) {
    const progress = this.getProgress();
    
    const existingProgress = progress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    );

    if (existingProgress) {
      existingProgress.completed = true;
      existingProgress.completedAt = new Date().toISOString();
    } else {
      progress.push({
        id: this.generateId(),
        userId: userId,
        courseId: courseId,
        lessonId: lessonId,
        completed: true,
        completedAt: new Date().toISOString(),
        quizScore: null,
        quizAttempts: 0
      });
    }

    localStorage.setItem('progress', JSON.stringify(progress));
    return existingProgress || progress[progress.length - 1];
  }

  // Quiz natijasini saqlash
  saveQuizResult(userId, courseId, lessonId, score, passingScore) {
    const progress = this.getProgress();
    
    let userProgress = progress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    );

    if (!userProgress) {
      userProgress = {
        id: this.generateId(),
        userId: userId,
        courseId: courseId,
        lessonId: lessonId,
        completed: score >= passingScore,
        completedAt: score >= passingScore ? new Date().toISOString() : null,
        quizScore: score,
        quizAttempts: 1
      };
      progress.push(userProgress);
    } else {
      userProgress.quizScore = Math.max(userProgress.quizScore || 0, score);
      userProgress.quizAttempts = (userProgress.quizAttempts || 0) + 1;
      if (score >= passingScore) {
        userProgress.completed = true;
        userProgress.completedAt = new Date().toISOString();
      }
    }

    localStorage.setItem('progress', JSON.stringify(progress));
    return userProgress;
  }

  // Foydalanuvchining barcha progressini olish
  getUserProgress(userId) {
    const progress = this.getProgress();
    return progress.filter(p => p.userId === userId);
  }

  // Kurs bo'yicha progressni olish
  getCourseProgress(userId, courseId) {
    const progress = this.getUserProgress(userId);
    return progress.filter(p => p.courseId === courseId);
  }

  // Kurs tugatilgan darslar sonini hisoblash
  getCompletedLessonsCount(userId, courseId) {
    const courseProgress = this.getCourseProgress(userId, courseId);
    return courseProgress.filter(p => p.completed).length;
  }

  // Kurs tugatilish foizini hisoblash
  getCourseCompletionPercentage(userId, courseId) {
    const course = getCourseById(courseId);
    if (!course) return 0;

    const totalLessons = course.lessons.length;
    const completedCount = this.getCompletedLessonsCount(userId, courseId);
    
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  }

  // Lesson tugatilganmi?
  isLessonCompleted(userId, courseId, lessonId) {
    const progress = this.getProgress();
    const lesson = progress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    );
    return lesson ? lesson.completed : false;
  }

  // Lesson quiz balini olish
  getQuizScore(userId, courseId, lessonId) {
    const progress = this.getProgress();
    const lesson = progress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    );
    return lesson ? lesson.quizScore : null;
  }

  // Barcha progressni olish
  getProgress() {
    const progress = localStorage.getItem('progress');
    return progress ? JSON.parse(progress) : [];
  }

  // Foydalanuvchining umumiy statistikasini olish
  getUserStats(userId) {
    const userProgress = this.getUserProgress(userId);
    const completedLessons = userProgress.filter(p => p.completed).length;
    const quizzesTaken = userProgress.filter(p => p.quizScore !== null).length;
    const averageScore = quizzesTaken > 0
      ? Math.round(userProgress
          .filter(p => p.quizScore !== null)
          .reduce((sum, p) => sum + p.quizScore, 0) / quizzesTaken)
      : 0;

    return {
      completedLessons: completedLessons,
      quizzesTaken: quizzesTaken,
      averageScore: averageScore,
      coursesProgress: this.getUserCoursesStats(userId)
    };
  }

  // Foydalanuvchining kurs bo'yicha statistikasini olish
  getUserCoursesStats(userId) {
    const coursesStats = [];
    
    coursesData.forEach(course => {
      const percentage = this.getCourseCompletionPercentage(userId, course.id);
      const courseProgress = this.getCourseProgress(userId, course.id);
      const quizzes = courseProgress.filter(p => p.quizScore !== null);
      
      coursesStats.push({
        courseId: course.id,
        courseName: course.name,
        completionPercentage: percentage,
        completedLessons: courseProgress.filter(p => p.completed).length,
        totalLessons: course.lessons.length,
        averageScore: quizzes.length > 0
          ? Math.round(quizzes.reduce((sum, p) => sum + p.quizScore, 0) / quizzes.length)
          : 0
      });
    });

    return coursesStats;
  }

  // ID yaratish
  generateId() {
    return 'progress_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}

// Global instance
const progress = new ProgressManager();
