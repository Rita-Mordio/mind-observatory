const TemplateViewData = [
    {
        navigationName: 'EditDiarySimple',
        template: 1, //템플릿 번호
        title: '심플형',
        description: '간단하게 작성하여 한눈에 보기 좋아요.',
        viewData: [
            {
                flex: 6.5,
                title: ['이미지'],
            },
            {
                flex: 1.3,
                title: ['제목'],
            },
            {
                flex: 2,
                title: ['내용'],
            },
        ],
    },
    {
        navigationName: 'EditDiaryDetail',
        template: 2,
        title: '디테일형',
        description: '오늘 하루를 자세하게 남길 수 있어요.',
        viewData: [
            {
                flex: 4,
                title: ['이미지'],
            },
            {
                flex: 1.3,
                title: ['제목'],
            },
            {
                flex: 3,
                title: ['내용'],
            },
        ],
    },
]

export default TemplateViewData