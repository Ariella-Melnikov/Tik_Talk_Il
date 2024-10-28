import { createI18n } from 'vue-i18n';


const messages = {
  en: {
    header: {
        title: 'Tik Talk - Make English Easy',
        home: 'Home',
        about: 'About',
        admin: 'Admin',
        login: 'Login',
        logout: 'Logout',
        questionsManagement: 'Questions Management',
    },
    home: {
        heading: 'English Group Lessons - Learn Together Through Experiences',
        description: 'Online group lessons for children, using experiential learning',
        actionButton: 'Schedule a Trial Lesson'
      },
      form: {
        title: 'Sign Up for a Trial Lesson',
        Subtitle: "If necessary, you can cancel after the trial lesson and receive your money back.",
        parentFullName: 'Parent full Name',
        parentEmail: 'Parent email',
        parentPhoneNumber: 'Parent phone Number', 
        kidsAge: 'Child’s Age',
        course: 'Course',
        selectCourse: 'Select a course',
        womenCourse: "Women's English Course",
        kidsCourse: 'Kids Classes (Online)',
        businessCourse: 'Business English Course',
        submit: 'Submit',
        subscribe: 'Subscribe to the newsletter',
        adultTitle: 'Sign Up for Adult English Courses',
        adultSubtitle: 'Enhance your English skills with our tailored courses.',
        fullName: 'Full Name',
        email: 'Email Address',
        phoneNumber: 'Phone Number',
        courseType: 'Course Type',
        selectCourseType: 'Select a course type',
        businessCourse: 'Business English',
        conversationalCourse: 'Conversational English',
        academicCourse: 'Academic English',
      },
      quiz: {
        title: 'Test Your English Knowledge',
        submit: 'Submit',
        next: 'Next',
        resultTitle: 'Your Result',
        perfectScoreMessage: 'Great job! You have excellent English skills!',
        partialScoreMessage: 'Good effort! Consider signing up for a one-on-one course to improve your skills.',
        lowScoreMessage: 'It looks like you could benefit from some help. Sign up for our one-on-one adult courses!',
        startCourse: 'Sign Up Now',
        signUpForCourse: 'Sign Up for Adult Courses',
      },
      table: {
        adultheader: 'Adult Form Submissions',
        kidsheader: 'Kids Form Submissions',
        fullname: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        course: 'Course Type',
        actions: 'Actions',
        subscribed: 'Subscribed',
        parentname: 'Parent Full Name',
        parentemail: 'Parent Email',
        parentphone: 'Parent Phone Number',
        kidsage: 'Child’s Age',
        question: 'Questions',
        answers: 'Answers',
        correctAnswer: 'Correct Answer',
        questionText: "Question Text",
        options: "Answer Options",
        addOption: "Add an Answer",
        remove: "Remove",
      },
      actions: {
        edit: "Edit",
        delete: "Delete",
        markAsRead: "Mark as Read",
        markAsUnread: "Mark as Unread",
        addNewAdultSubmission: "Add New Adult Submission",
        addNewKidsSubmission: "Add New Kids Submission",
        addQuestion: "Add a question",
        addingQuestion: "Adding a new question",
        editQuestion: "Edit a question",
        update: "Update",
        save: "Save",
        cancel: "Cancel",
    },
    editSubmissions: {
      editTitle: "Edit Submission",
      addTitle: "Add New Submission",
      saveChanges: "Save Changes",
      addSubmission: "Add Submission",
    },
    about: {
      title: 'Speak English<br>Fluently'
    },
  },
  he: {
    header: {
        title: 'טיק טוק - ללמוד אנגלית בקלות',
        home: 'בית',
        about: 'אודות',
        admin: 'מנהל אתר',
        login: 'התחבר',
        logout: 'התנתק',
        questionsManagement: 'ניהול שאלות',
    },
    home: {
        heading: 'שיעורי אנגלית בקבוצות בזום- ללמוד אנגלית מתוך משחקים, שירים והפעלות',
        description: 'שיעורים קבוצתיים מקוונים לילדים, בעזרת למידה חווייתית, פעם בשבוע 45 דקת גילאי יסודי',
        actionButton: 'לתיאום שיעורי ניסיון'
      },
      form: {
        title: 'הירשמו לשיעור ניסיון',
        subtitle: 'במידת הצורך ניתן לבטל לאחר השיעור ניסיון ולקבל את כספכם חזרה',
        parentFullName: ' שם מלא של ההורה',
        parentEmail: ' אימייל של ההורה',
        parentPhoneNumber: 'טלפון של ההורה',  // Added phone number translation
        course: 'קורס',
        kidsAge: '.גיל הילד/ה',
        selectCourse: 'בחר קורס',
        womenCourse: 'קורס אנגלית לנשים',
        kidsCourse: 'שיעורים לילדים (באינטרנט)',
        businessCourse: 'קורס אנגלית עסקית',
        submit: 'שלח',
        subscribe: 'הרשמו לניוזלטר',
        adultTitle: 'הירשם לקורסי אנגלית למבוגרים',
        adultSubtitle: 'שפר את כישורי האנגלית שלך עם הקורסים שלנו',
        fullName: 'שם מלא',
        email: 'כתובת אימייל',
        phoneNumber: 'מספר טלפון',
        courseType: 'סוג הקורס',
        selectCourseType: 'אני מתעניינת בקורס מסוג  ',
        businessCourse: 'הכנה לראיונות',
        conversationalCourse: 'שיפור יכולות שיחה באנגלית',
        academicCourse: 'אנגלית אקדמאית',
      },
      quiz: {
        title: ' איך האנגלית שלך? בדקו את עצמכם',
        submit: 'שלח',
        next: 'המשך',
        resultTitle: 'התוצאה שלך',
        perfectScoreMessage: 'עבודה מצוינת! יש לך כישורי אנגלית מצוינים!',
        partialScoreMessage: 'מאמץ טוב! שקול להירשם לקורס אישי לשיפור הכישורים שלך.',
        lowScoreMessage: 'נראה שתוכל להפיק תועלת מעזרה. הירשם לקורסי המבוגרים שלנו!',
        startCourse: 'הירשם עכשיו',
        signUpForCourse: 'הירשם לקורסי מבוגרים',
      },
      table: {
        adultheader: ' פרטי טפסים בוגרים',
        kidsheader: 'פרטי טפסים ילדים',
        fullname: 'שם מלא',
        email: 'אימייל',
        phone: 'מספר טלפון',
        course: 'סוג קורס',
        actions:'ניהול טבלה',
        subscribed: 'רישום לניוזלטר',
        parentname: 'שם מלא של ההורה',
        parentemail: 'אימייל של ההורה',
        parentphone: 'טלפון של ההורה',
        kidsage: 'גיל הילד/ה',
        question: 'שאלות',
        answers: 'תשובות',
        correctAnswer: 'התשובה הנכונה',
        questionText: "תוכן השאלה",
        options: "תשובות",
        addOption: "הוסף תשובה",
        remove: "מחק",
      },
      actions: {
        edit: "עריכה",
        delete: "מחיקה",
        markAsRead: "סמן כטופל",
        markAsUnread: "סמן כלא טופל",
        addNewAdultSubmission: "הוספת טופס בוגר חדש",
        addNewKidsSubmission: "הוספת טופס ילדים חדש",
        addQuestion: " להוסיף שאלה",
        editQuestion: "עריכת שאלה",
        addingQuestion: "הוספת שאלה",
        update: "עדכן",
        save: "שמירה",
        cancel: "ביטול",
    },
    editSubmissions: {
      editTitle: "עריכת טופס",
      addTitle: "הוספת טופס חדש",
      saveChanges: "שמור שינויים",
      addSubmission: "הוסף טופס",
    },
    about: {
      title: 'לדבר אנגלית<br>באופן שוטף'
    },
  }
};

const i18n = createI18n({
  locale: 'he',
  fallbackLocale: 'en',
  messages,
});

export default i18n;