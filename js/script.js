{
  ('use strict');

  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post .post-author',
    tagsListSelector: '.list.tags',
    authorListSelector: '.list.authors',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
  };

  // const opts.ArticleSelector = '.post',
  //   opts.TitleSelector = '.post-title',
  //   opts.TitleListSelector = '.titles',
  //   opts.ArticleTagsSelector = '.post-tags .list',
  //   opts.ArticleAuthorSelector = '.post .post-author',
  //   opts.TagsListSelector = '.list.tags',
  //   opts.AuthorListSelector = '.list.authors',
  //   opts.CloudClassCount = 5,
  //   opts.CloudClassPrefix = 'tag-size-';

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

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] Remove contents of titleList */

    const titleList = document.querySelector(opts.titleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(
      opts.articleSelector + customSelector
    );

    let html = '';
    for (let article of articles) {
      /* [DONE] Get the article ID */
      const articleID = article.getAttribute('id');

      /* [DONE] Find the title element */
      /* [DONE] Get the title from the title element */
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

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
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function (tags) {
    const params = {
      min: 999999,
      max: 0,
    };
    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' time[s]');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      } else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
    return opts.cloudClassPrefix + classNumber;
  };

  const generateTags = function () {
    /* [NEW] [DONE] create a new variable allTags with an empty [NEW] object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* [DONE] START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      const tagList = article.querySelector(opts.articleTagsSelector);

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

        /* [NEW] [DONE] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] [DONE] add [NEW] tag to allTags [NEW] object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all links into the tags wrapper */
      tagList.innerHTML = html;
      /* [DONE] END LOOP: for every article */
    }
    /* [NEW] [DONE] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);

    /* [NEW] [DONE] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* [NEW-object] [DONE] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW-object] [DONE] START LOOP: for each tag in allTags */
    for (let tag in allTags) {
      const tagLinkHTML =
        '<li><a href="#tag-' +
        tag +
        '" class="' +
        calculateTagClass(allTags[tag], tagsParams) +
        '">' +
        tag +
        '</a></li>';
      // console.log('tagLinkHTML:', tagLinkHTML);
      /* [NEW-object] [DONE] generate code of a link and add it to allTagsHTML */
      allTagsHTML += tagLinkHTML;

      // '<li><a href="#tag-' +
      // tag +
      // '"><span>' +
      // tag +
      // ' (' +
      // allTags[tag] +
      // ') ';
      /* [NEW-object] [DONE] END LOOP: for each tag in allTags */
    }

    /* [NEW-object] [DONE] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();

  const tagClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make a new constant named "clickedElement" and give it value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    //replace #tag- with '' to get "cat" for example, without "#tag-" prefix
    const tag = href.replace('#tag-', '');

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
    /* [NEW] [DONE] create a new variable allAuthors with an empty [NEW] object */
    let allAuthors = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);
    /* [DONE] START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorList = article.querySelector(opts.articleAuthorSelector);
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

      /* [NEW] [DONE] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthors]) {
        /* [NEW] [DONE] add [NEW] Author to allAuthors [NEW] object */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
      /* [DONE] END LOOP: for every article */
    }
    /* [NEW] [DONE] find list of Authors in right column */
    const authorList = document.querySelector(opts.authorListSelector);

    /* [NEW-object] [DONE] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW-object] [DONE] START LOOP: for each Author in allAuthors */
    for (let author in allAuthors) {
      const authorLinkHTML =
        '<li><a href="#author-' +
        author +
        '">' +
        author +
        ' (' +
        allAuthors[author] +
        ')</a></li>';
      // console.log('authorLinkHTML: ', authorLinkHTML);
      /* [NEW-object] [DONE] generate code of a link and add it to allAuthorsHTML */
      allAuthorsHTML += authorLinkHTML;
    }

    /* [NEW-object] [DONE] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
  };

  // '<li><a href="#tag-' +
  // tag +
  // '"><span>' +
  // tag +
  // ' (' +
  // allTags[tag] +
  // ') ';

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
    /* [DONE] START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* [DONE] add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}
