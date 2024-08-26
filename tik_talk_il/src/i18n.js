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
        resultTitle: 'Your Result',
        perfectScoreMessage: 'Great job! You have excellent English skills!',
        partialScoreMessage: 'Good effort! Consider signing up for a one-on-one course to improve your skills.',
        lowScoreMessage: 'It looks like you could benefit from some help. Sign up for our one-on-one adult courses!',
        startCourse: 'Sign Up Now',
        signUpForCourse: 'Sign Up for Adult Courses',
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
        adultTitle: 'הירשם לקורסי אנגלית למבוגרים',
        adultSubtitle: 'שפר את כישורי האנגלית שלך עם הקורסים שלנו',
        fullName: 'שם מלא',
        email: 'כתובת אימייל',
        phoneNumber: 'מספר טלפון',
        courseType: 'סוג הקורס',
        selectCourseType: 'בחר סוג קורס',
        businessCourse: 'אנגלית עסקית',
        conversationalCourse: 'אנגלית שיחה',
        academicCourse: 'אנגלית אקדמאית',
      },
      quiz: {
        title: 'בדקי את הידע שלך באנגלית',
        submit: 'שלח',
        resultTitle: 'התוצאה שלך',
        perfectScoreMessage: 'עבודה מצוינת! יש לך כישורי אנגלית מצוינים!',
        partialScoreMessage: 'מאמץ טוב! שקול להירשם לקורס אישי לשיפור הכישורים שלך.',
        lowScoreMessage: 'נראה שתוכל להפיק תועלת מעזרה. הירשם לקורסי המבוגרים שלנו!',
        startCourse: 'הירשם עכשיו',
        signUpForCourse: 'הירשם לקורסי מבוגרים',
      },
  }
};

const i18n = createI18n({
  locale: 'he',
  fallbackLocale: 'en',
  messages,
});

export default i18n;