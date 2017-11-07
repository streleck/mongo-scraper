# mongo-scraper
This application uses the Cheerio NPM to scrape the Seattle Stranger news site. It stores the headline and a link to the full article in a Mongo database using Mongoose. On the main page, each headline is displayed with a link to the source article and a button that opens the user notes section for that article. User notes that have been saved to the database are displayed and the user has the options of creating a new note or deleting any old notes.

Articles are drawn from the database and not newly scraped from the Seattle Stranger website.  For this reason, there is a button at the bottom of the page to refresh the news articles.
