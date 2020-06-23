export const SpecialPages = [
    {
        name: 'Home',
        dbPath: '/home',
        components: {
            
        }
    },
    {
        name: 'About',
        dbPath: '/about',
        components: {
            
        }
    },
    {
        name: 'Rules',
        dbPath: '/rules',
        components: {
            
        }
    },
    {
        name: 'Resources',
        dbPath: '/resources',
        components: {
            
        }
    },
];

export const RegularPages = [
    {
        name: 'News Articles',
        dbPath: '/news',
        metaComponents: {
            Title: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Title'
                }
            },
            Description: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Description'
                }
            }
        },
        bodyComponents: {
            Body: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Body'
                }
            }
        },
        listItem: {
            title: 'Title/content'
        }   
    },
    {
        name: 'Challenges',
        dbPath: '/challenges',
        metaComponents: {
            Title: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Title'
                }
            },
            Description: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Description'
                }
            },
            Hint: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Hint'
                }
            },
        },
        bodyComponents: {
            Flag: {
                vueComp: () => import(/* webpackChunkName: "Text" */ '@/components/system/Text.vue'),
                props: {
                    headerTxt: 'Flag'
                }
            },
        },
        listItem: {
            title: 'Title/content'
        }
    }
];