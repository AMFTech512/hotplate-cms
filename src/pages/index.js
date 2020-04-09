export const SpecialPages = [
    {
        name: 'Home Page',
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
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/user/Text.vue')
            } 
        }
    },
    {
        name: 'Hello world',
        dbPath: '/home',
        components: {
            comp: {
                vueComp: () => import(/* webpackChunkName: "Helloworld" */ '@/components/user/HelloWorld.vue')
            }
        }
    }
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