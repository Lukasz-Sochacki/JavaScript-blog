{
  ('use strict');

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class "active" from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class "active" to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class "active" from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get "href" attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of "href" attribute) */
    const targetArticle = document.querySelector('article' + articleSelector);
    // console.log(targetArticle);

    /* [DONE] add class "active" to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
  optArticleAuthorSelector = '.post .post-author';

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] Remove contents of titleList */
    console.log(customSelector);

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

    let html = '';
    for (let article of articles) {
      /* [DONE] Get the article ID */
      const articleID = article.getAttribute('id');

      /* [DONE] Find the title element */
      /* [DONE] Get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] Create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleID +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      //   console.log(linkHTML);

      /* [DONE] Insert link into html variable */
      html = html + linkHTML;
      // console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
    // console.log(links);
  };

  generateTitleLinks();

  const generateTags = function () {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* [DONE] generate HTML of the link */
        const linkTag =
          '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        /* [DONE] add generated code to html variable */
        html = html + linkTag + ' ';
        // console.log(html);
        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all links into the tags wrapper */
      tagList.innerHTML = html;
      /* [DONE] END LOOP: for every article */
    }
  };
  generateTags();

  const tagClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make a new constant named "clickedElement" and give it value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    //replace #tag- with '' to get "cat" for example, without "#tag-" prefix
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* [DONE] find all tag links with class "active" */
    const activeTags = document.querySelectorAll('.post-tags a.active');
    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* [DONE] remove class active */
      activeTag.classList.remove('active');
      /* [DONE] END LOOP: for each active link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinks);

    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* [DONE] add class active */
      tagLink.classList.add('active');
      /* [DONE END LOOP: for each found tag link */
    }
    /* [DONE]execute function "generateTitleLinks" with article selector as a argument */
    //for example: [data-tags~='cat']
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const addClickListenersToTags = function () {
    /* [DONE] find all link to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* [DONE] START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToTags();

  const generateAuthors = function () {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-author attribute */
      const articleAuthors = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */
      const linkAuthor =
        '<li><a href="#author-' +
        articleAuthors +
        '"><span>' +
        articleAuthors +
        '</span></a></li>';
      /* [DONE] add generated code to html variable */

      html = html + linkAuthor;
      /* [DONE] insert HTML of all links into the author wrapper */
      authorList.innerHTML = html;
    }
  };
  generateAuthors();

  const authorClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make a new constant named "clickedElement" and give it value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* [DONE] find all author links with class "active" */
    const activeAuthors = document.querySelectorAll('.post-author a.active');
    /* [DONE] START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {
      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');
      /* [DONE] END LOOP: for each active link */
    }
    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
      /* [DONE] add class active */
      authorLink.classList.add('active');
      /* [DONE END LOOP: for each found tag link */
    }
    /* [DONE]execute function "generateTitleLinks" with article selector as a argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };
  const addClickListenersToAuthors = function () {
    /* [DONE] find all link to tags */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log(authorLinks);

    /* [DONE] START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* [DONE] add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}
