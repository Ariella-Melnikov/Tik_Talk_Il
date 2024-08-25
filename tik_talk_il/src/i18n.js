import { createI18n } from 'vue-i18n';


const messages = {
  en: {
    header: {
        title: 'Tik Talk - Make English Easy',
        home: 'Home',
        about: 'About'
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
      },
  },
  he: {
    header: {
        title: 'טיק טוק - ללמוד אנגלית בקלות',
        home: 'בית',
        about: 'אודות'
    },
    home: {
        heading: 'שיעורי אנגלית בקבוצות- ללמוד ביחד דרך חוויות',
        description: 'שיעורים קבוצתיים מקוונים לילדים, בעזרת למידה חווייתית',
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
      },
  }
};

const i18n = createI18n({
  locale: 'he',
  fallbackLocale: 'en',
  messages,
});

export default i18n;