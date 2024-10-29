import homeHeaderImage from '../public/images/headerImage.png'
import youtubeIcon from '../public/images/youtubeIcon.png'
import FacebookIcon from '../public/images/blog-detail-fb.png'
import LocationIcon from '../public/images/location-icon.png'
import PhoneIcon from '../public/images/phone-icon.png'
import MailIcon from '../public/images/mail-icon.png'
import TestimonialLeft from '../public/images/testimonial-left.svg'
import TestimonialRight from '../public/images/testimonial-right.svg'
import AboutUsVision from '../public/images/about-us-vision.png'
import LinkdeinIcon from '../public/images/linkdein-icon.png'
import aboutUsp1 from '../public/images/aboutUs-p1.png'
import aboutUsp2 from '../public/images/aboutUs-p2.png'
import aboutUsp3 from '../public/images/aboutUs-p3.png'
import aboutUsp4 from '../public/images/aboutUs-p4.png'
import aboutUsp5 from '../public/images/aboutUs-p5.png'
import banner from '../public/images/banner.png'
import bannerP1 from '../public/images/banner-p1.png'
import bannerP2 from '../public/images/banner-p2.png'
import bannerP3 from '../public/images/banner-p3.png'
import bannerP4 from '../public/images/banner-p4.png'
import bannerP5 from '../public/images/banner-p5.png'
import bannerP6 from '../public/images/banner-p6.png'
import likes from '../public/images/handsClapping.png'
import comments from '../public/images/chatTeardropDots.png'
import scrollToTop from '../public/images/scrollToTop.png'
import InstagramIcon from '../public/images/instagram-icon.png'
import { FEATURES } from '../data/features'

/*********          Header Menu Data            ********** */
export const pages = [
  {
    path: '/about-us',
    text: '关于我们',
  },
  {
    path: '/services',
    text: '服务',
  },
  {
    path: '/contact-us',
    text: '联系我们',
  },
  {
    path: '/team',
    text: '了解团队',
  },
]
if (FEATURES.blogs) {
  pages.push({
    path: '/blogs',
    text: '新闻资讯',
  })
}

if (FEATURES.product) {
  pages.push({
    path: '/product',
    text: '产品信息',
  })
}

export const siteName = '超星猩科技'

/***********            Home Page Main Data             *********** */
export const homeData = {
  title: `${siteName}`,
  header: '与我们一起改变您的产品业务',
  headerImage: homeHeaderImage,
  heading: '一站式解决您的需求',
  homeAim:
    '我们的目标是不断提供创新的解决方案，以满足客户的需求和期望。',
  contactUsButtonText: '联系我们',
  videoButtonText: '观看我们的视频',
  youtubeIcon: youtubeIcon,
  paragraphs: [
    {
      para: `超星猩是一家在线技术解决方案提供商，被认为是新一代思想家，致力于为客户创造有效的商业解决方案。我们渴望成为客户通过数字平台推动业务发展的全球领导者的首选。`,
    },
    {
      para: `我们的目标是为我们的客户提供完整的客户满意度，增长，创新，以及在其行业内不断发展和成长的途径。我们的目标是不断提供创新的解决方案，以满足客户的要求和期望。`,
    },
    {
      para: `我们的专业团队始终站在客户的一边，为他们提供诱人的量身定制的解决方案，以满足他们不断变化的业务环境，实现创新，可扩展，定制和经济高效的解决方案，满足您的业务需求。`,
    },
  ],
}

/**********           News and Blogs Data             ********* */
export const newsAndBlogs = {
  title: `${siteName} - 资讯`,
  header: '新闻资讯',
  heading:
    '我们的目标是不断提供创新的解决方案，以满足客户的要求和期望。',
  viewButtonText: '查看所有',
  likesImg: likes,
  commentsImg: comments,
  scrollToTopImg: scrollToTop,
}

/**********           Testimonials Data             ********** */
export const testimonialsData = {
  heading: '我们的团队',
  leftImg: TestimonialLeft,
  rightImg: TestimonialRight,
}

/**********            Home Page Services Data          ********* */
export const servicesData = {
  servicesPageTitle: '服务',
  servicesPageHeader: 'We are Offering the Amazing Services 🚀',
  servicesHeading: '我们提供的服务',
  servicesAim:
    '我们的目标是不断提供创新的解决方案，以满足客户的要求和期望。',
}

/**********             About Us Page Data            *************/
export const aboutUsPageData = {
  title: '关于我们',
  header: '我们正在改变整个游戏',
  heading: '成长最快的IT公司',
  aim: '我们的目标是不断提供创新的解决方案，以满足客户的要求和期望。',
  description: `超星猩科技是一家在线技术解决方案提供商，被认为是新一代思想家，致力于为客户创造有效的商业解决方案。我们渴望成为客户通过数字平台推动业务发展的全球领导者的首选。`,
  visionTitle: '我们的愿景',
  visionAim:
    '我们的目标是不断提供创新的解决方案，以满足客户的要求和期望。',
  visionImage: AboutUsVision,
  visionData: [
    {
      value: '30+',
      text: 'Years of Experience',
    },
    {
      value: '27',
      text: 'Offices Worldwide',
    },
    {
      value: '150',
      text: 'National Markets',
    },
    {
      value: '2M+',
      text: 'Clients a Year',
    },
  ],
}

/**********             About US Card Data               *********** */
export const aboutUsCardData = {
  aboutUsHeader: '关于我们',
  aboutUsHeading: '成长最快的IT公司',
  aboutUsDescription:
    "超星猩科技是一家在线技术解决方案提供商，被认为是新一代思想家，致力于为客户创造有效的商业解决方案。我们渴望成为客户通过数字平台推动业务发展的全球领导者的首选。",
  images: [
    {
      img: aboutUsp1,
      className: 'img-p1',
    },
    {
      img: aboutUsp2,
      className: 'img-p2',
    },
    {
      img: aboutUsp3,
      className: 'img-p3',
    },
    {
      img: aboutUsp4,
      className: 'img-p4',
    },
    {
      img: aboutUsp5,
      className: 'img-p5',
    },
  ],
}

/**********             Banner Card Data               *********** */
export const bannerCardData = {
  aboutUsHeader: '知名品牌合作伙伴',
  aboutUsDescription:
    '我们努力为您提供量身定制的尖端解决方案，以提升您的业务运营',
  images: [
    {
      img: bannerP1,
      className: 'img-p1',
    },
    {
      img: banner,
      className: 'img-p2',
    },
    {
      img: bannerP2,
      className: 'img-p3',
    },
    {
      img: bannerP3,
      className: 'img-p4',
    },
    {
      img: bannerP4,
      className: 'img-p5',
    },
    {
      img: bannerP5,
      className: 'img-p6',
    },
  ],
  partnersCard: [
    {
      title: '停车管理系统',
      description:
        '城市智慧停车系统，汽车新能源充电，两轮电动车充电，物业缴费，社区到访记录，人脸门禁，上门报修等。累计落地全国各地6000余停车场/充电站/社区。行业标杆，真正的商业级应用！',
      img: bannerP6,
    },
    {
      title: '能源管理系统',
      description:
        '能源管理系统用于建筑、工厂、商场、医院、还有光伏、储能、充电桩、微电网、设备控制、故障诊断、工单管理、人工智能优化等可选功能。资深专业团队开发维护，保障长期支持。',
      img: bannerP6,
    },
  ],
}

/*********          Contact Us Page Data            ************* */
export const contactUs = {
  title: `${siteName} - 联系我们`,
  heading: '联系我们，并开始建立惊人的产品',
}

/**********             Careers Page Data           ************* */
export const careersData = {
  title: `${siteName} - 职业生涯`,
  heading: '加入我们',
  buttonText: 'Search Jobs',
}

export const joinUsLinkIcons = [
  {
    icon: FacebookIcon,
    width: 13,
    height: 20,
    path: 'https://web.facebook.com/prixite/',
  },
  {
    icon: LinkdeinIcon,
    width: 24,
    height: 25,
    path: 'https://www.linkedin.com/company/prixite/mycompany/',
  },
]

/*********          Meet the Team Page Data            ************* */
export const categories: Array<string> = [
  'All',
  'Machine Learning',
  'Web App Development',
  'Mobile App Development',
  'Scraping',
  'Quality Assurance',
]

export interface Employee {
  id: number
  name: string
  title: string
  image: string
  description: string
  moreInfo: string
  DevelopmentStack: Array<string>
  facebookLink?: string
  twitterLink?: string
  linkedInLink?: string
  category: string
}

/**************             Footer Data         ************ */
export const footerData = {
  copyright: `超星猩科技有限公司 © ${new Date().getFullYear()}. All Rights Reserved`,
  details: [
    {
      icon: LocationIcon,
      desc: '广东省深圳市南山区沙河街道鹤塘岭花园一栋二单元',
    },
    {
      icon: PhoneIcon,
      desc: '19129445040',
    },
    {
      icon: MailIcon,
      desc: '277264530@qq.com',
    },
  ],
  info: {
    title: '更多信息',
    contactUs: [
      {
        text: '关于我们',
        path: '/about-us',
      },
      {
        text: '联系我们',
        path: '/contact-us',
      },
      {
        text: '服务',
        path: '/services',
      },
      {
        text: '新闻资讯',
        path: '/blogs',
      },
    ],
  },
  joinUs: {
    title: '加入我们',
    links: [
      {
        icon: FacebookIcon,
        width: 13,
        height: 20,
        path: 'https://web.facebook.com/prixite/',
      },
      {
        icon: LinkdeinIcon,
        width: 24,
        height: 25,
        path: 'https://www.linkedin.com/company/prixite/mycompany/',
      },
      {
        icon: InstagramIcon,
        width: 24,
        height: 25,
        path: 'https://www.instagram.com/prixitegram/',
      },
    ],
  },
}

export const contactForm = {
  success: '提交',
  error: '没有提交成功，请再试一次',
}

export const productsList = {
  title: `${siteName} - Product`,
  header: '我们的产品',
  heading:
    '我们的目标是打造安全可靠的产品，满足客户的需求。',
}
