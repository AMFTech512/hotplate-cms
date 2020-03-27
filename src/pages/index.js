export const SpecialPages = [
    {
        name: 'Home Page',
        dbPath: '/home',
        components: {
            ArticleTitle: () => import('@/components/Header.vue'),
            author: () => import('@/components/Header.vue')
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