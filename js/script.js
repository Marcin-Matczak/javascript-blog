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

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list';

    function generateTitleLinks(customSelector = '') {

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        console.log('Title list removed');

        /* [DONE] for each article */

        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        console.log('customSelector', customSelector);

        let html = '';

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

            /* [DONE] insert link into html variable */

            html = html + linkHTML;
        }

        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    }

    generateTitleLinks();

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = [];

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log('All found articles: ', articles);

        /* [DONE] START LOOP: for every article: */
        for (let article of articles) {
            console.log(article);

            /* [DONE] find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
            console.log('Tags wrapper working');

            /* [DONE] make html variable with empty string */
            let html = '';

            /* [DONE] get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log(articleTags);

            /* [DONE] split tags into array */
            const articleTagsArray = articleTags.split(' ');
            console.log('Array: ', articleTagsArray);

            /* [DONE] START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                console.log(tag);

                /* [DONE] generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                console.log(linkHTML);

                /* [DONE] add generated code to html variable */
                html = html + linkHTML;
                console.log(html);

                /* [NEW] check if this link is NOT already in allTags */
                if (allTags.indexOf(linkHTML) == -1) {
                    /* [NEW] add generated code to allTags array */
                    allTags.push(linkHTML);
                }

                /* [DONE] END LOOP: for each tag */
            }
            /* [DONE] insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;

            /* [DONE] END LOOP: for every article: */
        }

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        /* [NEW] add html from allTags to tagList */
        tagList.innerHTML = allTags.join(' ');

    }

    generateTags();

    function tagClickHandler(event) {

        /* [DONE] prevent default action for this event */
        event.preventDefault();

        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('Tag was clicked!', clickedElement);

        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);

        /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        console.log('Extracted tag:', tag);

        /* [DONE]find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        console.log('Active link:', activeTagLinks);

        /* [DONE] START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {

            /* [DONE] remove class active */
            activeTagLink.classList.remove('active');

            /* [DONE] END LOOP: for each active tag link */
        }

        /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
        const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(foundTagLinks);

        /* [DONE] START LOOP: for each found tag link */
        for (let foundTagLink of foundTagLinks) {

            /* [DONE] add class active */
            foundTagLink.classList.add('active');

            /* [DONE] END LOOP: for each found tag link */
        }

        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags() {

        /* [DONE] find all links to tags */
        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
        console.log(tagLinks);

        /* [DONE] START LOOP: for each link */
        for (let tagLink of tagLinks) {

            /* [DONE] add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);

            /* [DONE] END LOOP: for each link */
        }
    }
    addClickListenersToTags();

    function generateAuthors() {

        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log('Articles:', articles);

        /* [DONE] START LOOP: for every article: */
        for (let article of articles) {

            /* [DONE] find authors wrapper */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            console.log('Author wrapper working', authorWrapper);

            /* [DONE] make html variable with empty string */
            let html = '';

            /* [DONE] get authors from data-author attribute */
            const author = article.getAttribute('data-author');
            console.log('Author:', author);

            /* [DONE] generate HTML of the link */
            const linkHTML = '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li> ';
            console.log(linkHTML);

            /* [DONE] add generated code to html variable */
            html = html + linkHTML;

            /* [DONE] insert HTML of all the authors into the authors wrapper */
            authorWrapper.innerHTML = html;
            console.log(authorWrapper);

            /* [DONE] END LOOP: for every article */
        }

    }
    generateAuthors();

    function authorClickHandler(event) {
        /* [DONE] prevent default action for this event */
        event.preventDefault();

        /* [DONE] make a new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('Author was clicked!', clickedElement);

        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);

        /* [DONE] make a new constant "author" and extract author name from the "href" constant */
        const author = href.replace('#author-', '');
        console.log('Extracted author:', author);

        /* [DONE] find all author links with class active */
        const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
        console.log('Active link:', activeAuthorLinks);

        /* [DONE] START LOOP: for each active author link */
        for (let activeAuthorLink of activeAuthorLinks) {

            /* [DONE] remove class active */
            activeAuthorLink.classList.remove('active');

            /* [DONE] END LOOP: for each active author link */
        }

        /* [DONE] find all author links with "href" attribute equal to the "href" constant */
        const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(foundAuthorLinks);

        /* [DONE] START LOOP: for each found author link */
        for (let foundAuthorLink of foundAuthorLinks) {

            /* [DONE] add class active */
            foundAuthorLink.classList.add('active');

            /* [DONE] END LOOP: for each found author link */
        }

        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors() {

        /* [DONE] find all links to authors */
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        console.log(authorLinks);

        /* [DONE] START LOOP: for each link */
        for (let authorLink of authorLinks) {

            /* [DONE] add tagClickHandler as event listener for that link */
            authorLink.addEventListener('click', authorClickHandler);
            console.log('Author link was clicked!');

            /* [DONE] END LOOP: for each link */
        }
    }

    addClickListenersToAuthors();

}



