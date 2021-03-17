'use strict';

{

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');


        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');
        console.log('Wybrano', articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
        console.log('Artykuł', targetArticle);

        /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');
        console.log('clickedArticle:', targetArticle);
    }


    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
        console.log('Title list removed');

        /* [IN PROGRESS] for each article */

        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            console.log(article);

            /* [DONE] get the article id */

            const articleId = article.getAttribute('id');
            console.log('Article by Id:', articleId);

            /* [DONE] find the title element */
            /* [DONE] get the title from the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);

            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log('Generated link:', linkHTML);



        }



    }

    generateTitleLinks();
}

