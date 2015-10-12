/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('All feeds have a non empty URL', function(){
            //Go over all feeds and check that the URL is not null
            for(var i = 0; i< allFeeds.length; i++){
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

        it('All feeds have a name defined and it is not empty', function(){
            //Go over all feeds and check that the name is not null
            for(var i = 0; i< allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined;
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
     });

    describe('The menu', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        var visible;
        var menuIcon = $('.menu-icon-link');

        it('The menu is hidden by default', function() {
            //The 'menu-hidden' is the class that enables the menu to be hidden
            //Check if the class is used in the body when openeing the app
            visible = $('body').hasClass('menu-hidden');
            expect(visible).toBe(true);
        });

        it('The menu displays when clicked', function() {
            //Simulate a click on the menu icon - the class 'menu-hidden' should disappear from the DOM
            menuIcon.trigger("click");
            visible = $('body').hasClass('menu-hidden');
            expect(visible).toBe(false);
            menuIcon.trigger("click");
        });

        it('The menu hides when clicked again', function() {
            //Simulate 2 clicks on the menu icon
            //The class 'menu-hidden' should be back in the DOM after the secone click
            menuIcon.click();
            menuIcon.click();
            visible = $('body').hasClass('menu-hidden');
            expect(visible).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        beforeEach(function(done) {
            //Finish the loadFeed function before continuing to the test
            loadFeed(0, done);
        });

        it('on loadFeed - at least one entry element under feed container', function() {
            //The num of elements of type 'entry' that are inside the 'feed' container should be bigger than 0
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        var origFeed, UpdatedFeed;
        beforeEach(function(done) {
            //Finish the loadFeeds function before continuing to the test 
            loadFeed(1, function() {
                origFeed = $('.feed').html();
                done();
            });
            loadFeed(2, function() {
                UpdatedFeed = $('.feed').html();
                done();
            });
        });

        it('On loadFeed - the content actually changes', function() {
            //Finish the new loadFeed function before continuing to the test
            //The content that is created after each of these load should be different
            expect(origFeed).not.toEqual(UpdatedFeed);
        });
    });
}());