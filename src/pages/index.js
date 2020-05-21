export const SpecialPages = [
    {
        name: 'Home',
        dbPath: '/home',
        components: {
            GreetingText: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Greeting Text',
                    defaultTxt: 'Making Math and Science Easy.'
                }
            },
            SmallerGreetingText: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue'),
                props: {
                    headerTxt: 'Subheader Message'
                }
            } 
        }
    },
    {
        name: 'Services',
        dbPath: '/services',
        components: {}
    },
    {
        name: 'Testimonials',
        dbPath: '/testimonials',
        components: {
            Testimonials: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "Quote" */ '@/components/user/Quote.vue'),
                    props: {
                        headerTxt: 'Testimonial'
                    }
                }
            }
        }
    },
    {
        name: 'About',
        dbPath: '/about-us',
        components: {}
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
    {
        name: 'Blog Articles',
        dbPath: '/blogs',
        components: [
            {
                name: 'Header',
                path: '@/components/Header.vue'
            }
        ],
        data: {
            title: '',
            body: '',
            author: ''
        }
    }
];