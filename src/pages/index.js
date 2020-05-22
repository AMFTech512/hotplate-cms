export const SpecialPages = [
    {
        name: 'Home',
        dbPath: '/home',
        components: {
            SEODesc: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Search Engine Description'
                }
            },
            Greeting: {
                vueComp: () => import(/* webpackChunkName: "Greeting" */ '@/components/user/Greeting.vue'),
                props: {
                    headerTxt: 'Greeting',
                    imgPath: '/hotplate-cms/home/greeting-bg'
                }
            },
            Subjects: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "HeaderImgTxt" */ '@/components/user/HeaderImgTxt.vue'),
                    headerTxt: 'Subjects',
                    props: {
                        headerTxt: 'Math',
                        imgPath: '/hotplate-cms/home/subject-imgs'
                    }
                }
            },
            Vision: {
                vueComp: () => import(/* webpackChunkName: "HeaderImgTxt" */ '@/components/user/HeaderImgTxt.vue'),
                props: {
                    headerTxt: 'Calling all middle school, high school, and college students',
                    imgPath: '/hotplate-cms/home/vision-bg'
                }
            },
            Testimonial: {
                vueComp: () => import(/* webpackChunkName: "Quote" */ '@/components/user/Quote.vue'),
                props: {
                    headerTxt: 'What parents and students are saying'
                }
            },
            Contact: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "Contact" */ '@/components/user/Contact.vue'),
                    headerTxt: 'Contacts'
                }
            }
        }
    },
    {
        name: 'Services',
        dbPath: '/services',
        components: {
            SEODesc: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Search Engine Description'
                }
            },
            Methodology: {
                vueComp: () => import(/* webpackChunkName: "HeaderNText" */ '@/components/user/HeaderNText.vue'),
                props: {
                    headerTxt: 'Methodology'
                }
            },
            TeachingStyle: {
                vueComp: () => import(/* webpackChunkName: "List" */ '@/components/user/List.vue'),
                props: {
                    headerTxt: 'Teaching Style',
                    maxItems: 3
                }
            },
            Subjects: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "SubjectList" */ '@/components/user/SubjectList.vue'),
                    headerTxt: 'Subjects'
                }
            }
        }
    },
    {
        name: 'Testimonials',
        dbPath: '/testimonials',
        components: {
            SEODesc: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Search Engine Description'
                }
            },
            Testimonials: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    headerTxt: 'Testimonials',
                    compType: () => import(/* webpackChunkName: "Quote" */ '@/components/user/Quote.vue'),
                    props: {
                        headerTxt: 'Testimonial'
                    }
                }
            }
        }
    },
    {
        name: 'About Us',
        dbPath: '/about-us',
        components: {
            SEODesc: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Search Engine Description'
                }
            },
            People: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "HeaderImgTxt" */ '@/components/user/HeaderImgTxt.vue'),
                    headerTxt: 'Employees',
                    props: {
                        imgPath: '/hotplate-cms/about/portraits'
                    }
                }
            }
        }
    },
    {
        name: 'Footer',
        dbPath: '/footer',
        components: {
            FooterTxt: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Footer Text'
                }
            }
        }
    }
    // {
    //     name: 'Hello world',
    //     dbPath: '/home',
    //     components: {
    //         comp: {
    //             vueComp: () => import(/* webpackChunkName: "Helloworld" */ '@/components/user/HelloWorld.vue')
    //         }
    //     }
    // }
];

export const RegularPages = [
    // {
    //     name: 'Blog Articles',
    //     dbPath: '/blogs',
    //     components: [
    //         {
    //             name: 'Header',
    //             path: '@/components/Header.vue'
    //         }
    //     ],
    //     data: {
    //         title: '',
    //         body: '',
    //         author: ''
    //     }
    // }
];