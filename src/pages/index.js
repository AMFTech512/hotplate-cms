export const SpecialPages = [
    {
        name: 'Home Page',
        dbPath: '/home',
        components: {
            ArticleTitle: () => import(/* webpackChunkName: "header" */ '@/components/user/Header.vue'),
            author: () => import(/* webpackChunkName: "header" */ '@/components/user/Header.vue')
        }
    },
    {
        name: 'Hello world',
        dbPath: '/home',
        components: {
            comp: () => import(/* webpackChunkName: "Helloworld" */ '@/components/user/HelloWorld.vue')
        }
    }
];

export const RegularPages = [
    {
        name: 'Blog Article',
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