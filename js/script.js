{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    //   console.log("Link was clicked!");
    //   console.log(event);

    /* [DONE] remove class "active" from all article links */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class "active" to the clicked link */
    //   console.log("clickedElement: ", clickedElement);
    //   console.log("clickedElement (with plus): " + clickedElement);
    clickedElement.classList.add("active");

    /* [DONE] remove class "active" from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get "href" attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of "href" attribute) */
    const targetArticle = document.querySelector("article" + articleSelector);
    console.log(targetArticle);

    /* [DONE] add class "active" to the correct article */
    targetArticle.classList.add("active");
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  function generateTitleLinks() {
    /* [DONE] Remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = "";
    for (let article of articles) {
      /* [DONE] Get the article ID */
      const articleID = article.getAttribute("id");

      /* [DONE] Find the title element */
      /* [DONE] Get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] Create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleID +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      //   console.log(linkHTML);

      /* [DONE] Insert link into html variable */
      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll(".titles a");

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
    console.log(links);
  }

  generateTitleLinks();
}
