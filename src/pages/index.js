export const SpecialPages = [
    {
        name: 'Home',
        dbPath: '/home',
        components: {
            CompetitionInfo: {
                vueComp: () => import(/* webpackChunkName: "MDEditor" */ '@/components/system/MDEditor.vue'),
                props: {
                    headerTxt: 'Competition Information'
                }
            },
            Cards: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "MDEditor" */ '@/components/system/MDEditor.vue'),
                    headerTxt: 'Cards',
                    props: {
                        headerTxt: ''
                    }
                }
            }
        }
    },
    {
        name: 'About',
        dbPath: '/about',
        components: {
            DevTeam: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "HeaderImgTxt" */ '@/components/system/HeaderImgTxt.vue'),
                    headerTxt: 'Developers',
                    props: {
                        headerTxt: 'Developer',
                        imgPath: '/about/dev-imgs'
                    }
                }
            },
            AboutCards: {
                vueComp: () => import(/* webpackChunkName: "ComponentList" */ '@/components/system/ComponentList.vue'),
                props: {
                    compType: () => import(/* webpackChunkName: "MDEditor" */ '@/components/system/MDEditor.vue'),
                    headerTxt: 'About Cards',
                    props: {
                        headerTxt: 'Card'
                    }
                }
            }
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
                vueComp: () => import(/* webpackChunkName: "MDEditor" */ '@/components/system/MDEditor.vue'),
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